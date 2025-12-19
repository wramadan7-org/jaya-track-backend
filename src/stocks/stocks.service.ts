import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from './stocks.entity';
import { QueryFailedError, Repository } from 'typeorm';
import {
  CreateStockDto,
  FindOneStockDto,
  StockDto,
  UpdateStockDto,
} from 'src/common/dtos/stocks.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stocks)
    private stockRepository: Repository<Stocks>,
  ) {}

  async create(body: CreateStockDto): Promise<ResponseDto<StockDto>> {
    const stock = this.stockRepository.create(body);

    try {
      const savedStock = await this.stockRepository.save(stock);

      return { data: savedStock, message: 'Stock created successfully' };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Stock already exists');
      }
      throw error;
    }
  }

  async findAll(filter: FindOneStockDto): Promise<ResponseDto<StockDto[]>> {
    const qb = this.stockRepository
      .createQueryBuilder('stocks')
      .leftJoinAndSelect('stocks.product', 'products');

    if (filter.name) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:name)', {
        name: `%${filter.name}%`,
      });
    }

    if (filter.productId) {
      qb.andWhere('stocks.productId = :productId', {
        productId: filter.productId,
      });
    }

    if (filter.qty !== undefined) {
      qb.andWhere('stocks.qty = :qty', {
        qty: filter.qty,
      });
    }

    if (filter.unitType) {
      qb.andWhere('UPPER(stocks.unitTyoe) = UPPER(:unitType)', {
        unitType: filter.unitType,
      });
    }

    if (filter.id) {
      qb.andWhere('stocks.id = :id', {
        id: filter.id,
      });
    }

    const stocks = await qb.getMany();

    return { data: stocks, message: 'Stocks retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOneStockDto>,
  ): Promise<ResponseDto<StockDto>> {
    const qb = this.stockRepository
      .createQueryBuilder('stocks')
      .leftJoinAndSelect('stocks.product', 'products');

    if (params.name) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:name)', {
        name: `%${params.name}%`,
      });
    }

    if (params.productId) {
      qb.andWhere('stocks.productId = :productId', {
        productId: params.productId,
      });
    }

    if (params.qty !== undefined) {
      qb.andWhere('stocks.qty = :qty', {
        qty: params.qty,
      });
    }

    if (params.unitType) {
      qb.andWhere('UPPER(stocks.unitTyoe) = UPPER(:unitType)', {
        unitType: params.unitType,
      });
    }

    if (params.id) {
      qb.andWhere('stocks.id = :id', {
        id: params.id,
      });
    }

    const stock = await qb.getOne();

    if (!stock) throw new NotFoundException('Stock not found');

    return { data: stock, message: 'Stock retrieved successfully' };
  }

  async update(
    id: string,
    body: UpdateStockDto,
  ): Promise<ResponseDto<StockDto>> {
    const stock = await this.stockRepository.findOne({ where: { id } });

    if (!stock) throw new NotFoundException('Stock not found');

    Object.assign(stock, body);

    try {
      const updatedStock = await this.stockRepository.save(stock);

      return { data: updatedStock, message: 'Stock updated successfully' };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Stock already exists');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<StockDto>> {
    const stock = await this.stockRepository.findOne({ where: { id } });

    if (!stock) throw new NotFoundException('Stock not found');

    const removedStock = await this.stockRepository.remove(stock);

    if (!removedStock) throw new ConflictException('Failed to remove stock');

    return { data: removedStock, message: 'Stock removed successfully' };
  }
}
