import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import {
  EntityManager,
  FindOptionsWhere,
  ILike,
  In,
  QueryFailedError,
  Repository,
} from 'typeorm';
import {
  CreateProductDto,
  FindOneProductDto,
  ProductDto,
  UpdateProductDto,
} from 'src/common/dtos/products.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { FindOneUserDto } from 'src/common/dtos/users.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async create(body: CreateProductDto): Promise<ResponseDto<ProductDto>> {
    const product = this.productRepository.create({
      ...body,
    });

    try {
      const savedProduct = await this.productRepository.save(product);

      return { data: savedProduct, message: 'Product create successfully' };
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Product already exists');
      }
      throw error;
    }
  }

  async findAll(
    filter: Partial<FindOneProductDto>,
  ): Promise<ResponseDto<ProductDto[]>> {
    const where: FindOptionsWhere<Products> = {};

    if (filter.name) {
      where.name = ILike(`%${filter.name}%`);
    }

    if (filter.id) {
      where.id = filter.id;
    }

    const products = await this.productRepository.find({ where });

    return { data: products, message: 'Products retrieved successfully' };
  }

  async findByIdsManager(
    manager: EntityManager,
    ids: string[],
  ): Promise<Products[]> {
    return await manager.find(Products, { where: { id: In(ids) } });
  }

  async findOne(
    params: Partial<FindOneUserDto>,
  ): Promise<ResponseDto<ProductDto>> {
    const product = await this.productRepository.findOne({ where: params });

    if (!product) throw new NotFoundException('Product not found');

    return { data: product, message: 'Product retrieved successfully' };
  }

  async update(
    id: string,
    body: Partial<UpdateProductDto>,
  ): Promise<ResponseDto<ProductDto>> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, body);

    const updatedProduct = await this.productRepository.save(product);

    return { data: updatedProduct, message: 'Product updated successfully' };
  }

  async delete(id: string): Promise<ResponseDto<ProductDto>> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product not found');

    const deletedProduct = await this.productRepository.remove(product);

    if (!deletedProduct)
      throw new ConflictException('Failed to remove product');

    return { data: deletedProduct, message: 'Product removed successfully' };
  }
}
