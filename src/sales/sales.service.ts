import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Sales } from './sales.entity';
import {
  CreateSaleDto,
  FindOneSaleDto,
  SaleDto,
  UpdateSaleDto,
} from 'src/common/dtos/sales.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private salesRepository: Repository<Sales>,
  ) {}

  async create(body: CreateSaleDto): Promise<ResponseDto<SaleDto>> {
    const sale = this.salesRepository.create(body);

    try {
      const savedSale = await this.salesRepository.save(sale);

      return { data: savedSale, message: 'Sale created successfully' };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Sale already exists');
      }
      throw error;
    }
  }

  async findAll(filter: FindOneSaleDto): Promise<ResponseDto<SaleDto[]>> {
    const qb = this.salesRepository
      .createQueryBuilder('sales')
      .leftJoinAndSelect('sales.store', 'shops')
      .leftJoinAndSelect('sales.items', 'sales_items')
      .leftJoinAndSelect('sales_items.product', 'products');

    if (filter.storeName) {
      qb.andWhere('LOWER(shops.name) LIKE LOWER(:storeName)', {
        storeName: `%${filter.storeName}%`,
      });
    }

    if (filter.productName) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:productName)', {
        productName: `%${filter.productName}%`,
      });
    }

    if (filter.status) {
      qb.andWhere('UPPER(sales.status) LIKE UPPER(:status)', {
        status: filter.status,
      });
    }

    if (filter.invoiceNumber) {
      qb.andWhere('sales.invouce_number = :invoiceNumber', {
        invoiceNumber: filter.invoiceNumber,
      });
    }

    if (filter.storeId) {
      qb.andWhere('sales.store_id = :storeId', {
        storeId: filter.storeId,
      });
    }

    if (filter.id) {
      qb.andWhere('sales.id = :id', {
        id: filter.id,
      });
    }

    const sales = await qb.getMany();

    return { data: sales, message: 'Sales retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOneSaleDto>,
  ): Promise<ResponseDto<SaleDto>> {
    const qb = this.salesRepository
      .createQueryBuilder('sales')
      .leftJoinAndSelect('sales.store', 'shops')
      .leftJoinAndSelect('sales.items', 'sales_items')
      .leftJoinAndSelect('sales_items.product', 'products');

    if (params.storeName) {
      qb.andWhere('LOWER(shops.name) LIKE LOWER(:storeName)', {
        storeName: `%${params.storeName}%`,
      });
    }

    if (params.productName) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:productName)', {
        productName: `%${params.productName}%`,
      });
    }

    if (params.status) {
      qb.andWhere('UPPER(sales.status) LIKE UPPER(:status)', {
        status: params.status,
      });
    }

    if (params.invoiceNumber) {
      qb.andWhere('sales.invouce_number = :invoiceNumber', {
        invoiceNumber: params.invoiceNumber,
      });
    }

    if (params.storeId) {
      qb.andWhere('sales.store_id = :storeId', {
        storeId: params.storeId,
      });
    }

    if (params.id) {
      qb.andWhere('sales.id = :id', {
        id: params.id,
      });
    }

    const sale = await qb.getOne();

    if (!sale) throw new NotFoundException('Sale not found');

    return { data: sale, message: 'Sale retrieved successfully' };
  }

  async update(id: string, body: UpdateSaleDto): Promise<ResponseDto<SaleDto>> {
    const sale = await this.salesRepository.findOne({ where: { id } });

    if (!sale) throw new NotFoundException('Sale not found');

    Object.assign(sale, body);

    try {
      const updatedSale = await this.salesRepository.save(sale);

      return { data: updatedSale, message: 'Sale updated successfully' };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Sale already exists');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<SaleDto>> {
    const sale = await this.salesRepository.findOne({ where: { id } });

    if (!sale) throw new NotFoundException('Sale not found');

    const removedSale = await this.salesRepository.remove(sale);

    if (!removedSale) throw new ConflictException('Sale removed failed');

    return { data: removedSale, message: 'Sale removed successfully' };
  }
}
