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
import { SalesItems } from 'src/sales-items/sales-items.entity';
import { ProductsService } from 'src/products/products.service';
import { SalesItemsService } from 'src/sales-items/sales-items.service';
import { Products } from 'src/products/products.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { StockMovementsService } from 'src/stock-movements/stock-movements.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private salesRepository: Repository<Sales>,
    private productsService: ProductsService,
    private salesItemsService: SalesItemsService,
    private stocksService: StocksService,
    private stockMovementsService: StockMovementsService,
  ) {}

  async create(body: CreateSaleDto): Promise<ResponseDto<SaleDto>> {
    const queryRunner =
      this.salesRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let grandTotal = 0;

      const salesRepo = queryRunner.manager.getRepository(Sales);
      const sale = salesRepo.create(body);
      const savedSale = await salesRepo.save(sale);

      if (body.items?.length) {
        const productIds = body.items.map((item) => item.productId);

        const products: Products[] =
          await this.productsService.findByIdsManager(
            queryRunner.manager,
            productIds,
          );

        if (products.length !== productIds.length) {
          throw new NotFoundException('One or more products not found');
        }

        const salesItems: SalesItems[] =
          this.salesItemsService.createManyManager(
            queryRunner.manager,
            savedSale.id,
            body.items,
            products,
          );

        for (const item of salesItems) {
          const { qtyBefore, qtyAfter, unitType } =
            await this.stocksService.validateAndDecreaseStockManager(
              queryRunner.manager,
              item.productId,
              item.qty,
            );

          await this.stockMovementsService.createOutMovementManager(
            queryRunner.manager,
            {
              productId: item.productId,
              unitType,
              qtyBefore,
              qtyChange: item.qty,
              qtyAfter,
              referenceId: savedSale.id,
            },
          );

          grandTotal += item.subtotal;
        }

        await queryRunner.manager.save(SalesItems, salesItems);
      }

      await queryRunner.manager.update(
        Sales,
        { id: savedSale.id },
        { grandTotal },
      );

      await queryRunner.commitTransaction();

      return { data: savedSale, message: 'Sale created successfully' };
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
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
    } finally {
      await queryRunner.release();
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
      qb.andWhere('sales.status = :status', {
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
      qb.andWhere('sales.status = :status', {
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
