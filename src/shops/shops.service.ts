import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, QueryFailedError, Repository } from 'typeorm';
import { Shops } from './shops.entity';
import {
  CreateShopDto,
  FindOneShopDto,
  ShopDto,
  UpdateShopDto,
} from 'src/common/dtos/shops.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shops)
    private shopRepository: Repository<Shops>,
  ) {}

  async create(body: CreateShopDto): Promise<ResponseDto<ShopDto>> {
    const shop = this.shopRepository.create(body);

    try {
      const savedShop = await this.shopRepository.save(shop);

      return { data: savedShop, message: 'Shop created successfully' };
    } catch (error: unknown) {
      console.log(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error
      ) {
        throw new ConflictException('Failed to create shop');
      }
      throw error;
    }
  }

  async findAll(filter: FindOneShopDto): Promise<ResponseDto<ShopDto[]>> {
    const where: FindOptionsWhere<Shops> = {};

    if (filter.name) {
      where.name = ILike(`%${filter.name}%`);
    }

    if (filter.area) {
      where.name = ILike(`%${filter.area}%`);
    }

    if (filter.id) {
      where.id = filter.id;
    }

    const shops = await this.shopRepository.find({ where });

    return { data: shops, message: 'Shops retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOneShopDto>,
  ): Promise<ResponseDto<ShopDto>> {
    const shop = await this.shopRepository.findOne({ where: params });

    if (!shop) throw new NotFoundException('Shop not found');

    return { data: shop, message: 'Shop retrieved successfully' };
  }

  async update(id: string, body: UpdateShopDto): Promise<ResponseDto<ShopDto>> {
    const shop = await this.shopRepository.findOne({ where: { id } });

    if (!shop) throw new NotFoundException('Shop not found');

    Object.assign(shop, body);

    try {
      const updatedShop = await this.shopRepository.save(shop);

      return { data: updatedShop, message: 'Shop updated successfully' };
    } catch (error: unknown) {
      console.log(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Shop updated failed');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<ShopDto>> {
    const shop = await this.shopRepository.findOne({ where: { id } });

    if (!shop) throw new NotFoundException('Shop not found');

    try {
      const deletedShop = await this.shopRepository.remove(shop);

      return { data: deletedShop, message: 'Shop deleted successfully' };
    } catch (error: unknown) {
      console.error(error);
      throw new ConflictException('Shop deleted failed');
    }
  }
}
