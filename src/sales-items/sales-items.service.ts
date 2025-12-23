import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesItems } from './sales-items.entity';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import {
  CreateSaleItemDto,
  FindOneSaleItemDto,
  SaleItemDto,
} from 'src/common/dtos/sales-items.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { Products } from 'src/products/products.entity';
import { StockUnitType } from 'src/stocks/stocks.enum';

@Injectable()
export class SalesItemsService {
  constructor(
    @InjectRepository(SalesItems)
    private saleItemsRepository: Repository<SalesItems>,
  ) {}

  async create(body: CreateSaleItemDto): Promise<ResponseDto<SaleItemDto>> {
    const saleItem = this.saleItemsRepository.create(body);

    try {
      const savedSaleItem = await this.saleItemsRepository.save(saleItem);

      return { data: savedSaleItem, message: 'Sale item created successfully' };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Sale item already exists');
      }
      throw error;
    }
  }

  createManyManager(
    manager: EntityManager,
    saleId: string,
    items: CreateSaleItemDto[],
    products: Products[],
  ): SalesItems[] {
    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    return items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      const qty =
        item.unitType === StockUnitType.SACK
          ? item.qty * product.fillPerSack
          : item.qty;

      const subtotal = qty * item.price;

      return manager.create(SalesItems, {
        salesId: saleId,
        productId: item.productId,
        unitType: StockUnitType.DOZENS,
        fillPerSack: product.fillPerSack,
        qty,
        price: item.price,
        subtotal,
      });
    });
  }

  async findAll(
    filter: FindOneSaleItemDto,
  ): Promise<ResponseDto<SaleItemDto[]>> {
    const qb = this.saleItemsRepository
      .createQueryBuilder('sales_items')
      .leftJoinAndSelect('sales_items.product', 'products')
      .leftJoinAndSelect('sales_items.sales', 'sales');

    if (filter.id) {
      qb.andWhere('sales_items.id = :id', {
        id: filter.id,
      });
    }

    if (filter.salesId) {
      qb.andWhere('sales_items.sales_id = :salesId', {
        salesId: filter.salesId,
      });
    }

    if (filter.productId) {
      qb.andWhere('sales_items.product_id = :productId', {
        productId: filter.productId,
      });
    }

    if (filter.unitType) {
      qb.andWhere('sales_items.unit_type = :unitType', {
        unitType: filter.unitType,
      });
    }

    const saleItems = await qb.getMany();

    return { data: saleItems, message: 'Sale items retrieved successfully' };
  }
}
