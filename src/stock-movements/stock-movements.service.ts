import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMovements } from './stock-movements.entity';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import {
  CreateStockMovementDto,
  FindOneStockMovementDto,
  StockMovementDto,
  UpdateStockMovementDto,
} from 'src/common/dtos/stock-movements.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { StockUnitType } from 'src/stocks/stocks.enum';
import {
  StockMovementReferenceType,
  StockMovementsType,
} from './stock-movements.enum';

export type CreateOutMovementPayloadType = {
  productId: string;
  unitType: StockUnitType;
  qtyBefore: number;
  qtyChange: number;
  qtyAfter: number;
  referenceId: string;
};

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(StockMovements)
    private stockMovementsRepository: Repository<StockMovements>,
  ) {}

  async create(
    body: CreateStockMovementDto,
  ): Promise<ResponseDto<StockMovementDto>> {
    const stockMovement = this.stockMovementsRepository.create(body);

    try {
      const savedStockMovement =
        await this.stockMovementsRepository.save(stockMovement);

      return {
        data: savedStockMovement,
        message: 'Stock movement created successfully',
      };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Stock movement already exists');
      }
      throw error;
    }
  }

  async findAll(
    filter: FindOneStockMovementDto,
  ): Promise<ResponseDto<StockMovementDto[]>> {
    const qb = this.stockMovementsRepository
      .createQueryBuilder('stock_movements')
      .leftJoinAndSelect('stock_movements.product', 'products');

    if (filter.productName) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:productName)', {
        productName: `%${filter.productName}%`,
      });
    }

    if (filter.unitType) {
      qb.andWhere('stock_movements.unitType = :unitType', {
        unitType: filter.unitType,
      });
    }

    if (filter.type) {
      qb.andWhere('stock_movements.type = :type', {
        type: filter.type,
      });
    }

    if (filter.referenceType) {
      qb.andWhere('stock_movements.reference_type = :referenceType', {
        referenceType: filter.referenceType,
      });
    }

    if (filter.referenceId) {
      qb.andWhere('stock_movements.reference_id = :referenceId', {
        referenceId: filter.referenceId,
      });
    }

    if (filter.productId) {
      qb.andWhere('stock_movements.product_id = :productId', {
        productId: filter.productId,
      });
    }

    if (filter.id) {
      qb.andWhere('stock_movements.id = :id', {
        id: filter.id,
      });
    }

    const stockMovements = await qb.getMany();

    return {
      data: stockMovements,
      message: 'Stock movements retrieved successfully',
    };
  }

  async findOne(
    params: Partial<FindOneStockMovementDto>,
  ): Promise<ResponseDto<StockMovementDto>> {
    const qb = this.stockMovementsRepository
      .createQueryBuilder('stock_movements')
      .leftJoinAndSelect('stock_movements.product', 'products');

    if (params.productName) {
      qb.andWhere('LOWER(products.name) LIKE LOWER(:productName)', {
        productName: `%${params.productName}%`,
      });
    }

    if (params.unitType) {
      qb.andWhere('stock_movements.unitType = :unitType', {
        unitType: params.unitType,
      });
    }

    if (params.type) {
      qb.andWhere('stock_movements.type = :type', {
        type: params.type,
      });
    }

    if (params.referenceType) {
      qb.andWhere('stock_movements.reference_type = :referenceType', {
        referenceType: params.referenceType,
      });
    }

    if (params.referenceId) {
      qb.andWhere('stock_movements.reference_id = :referenceId', {
        referenceId: params.referenceId,
      });
    }

    if (params.productId) {
      qb.andWhere('stock_movements.product_id = :productId', {
        productId: params.productId,
      });
    }

    if (params.id) {
      qb.andWhere('stock_movements.id = :id', {
        id: params.id,
      });
    }

    const stockMovement = await qb.getOne();

    if (!stockMovement) throw new NotFoundException('Stock movement not found');

    return {
      data: stockMovement,
      message: 'Stock movement retrieved successfully',
    };
  }

  async update(
    id: string,
    body: UpdateStockMovementDto,
  ): Promise<ResponseDto<StockMovementDto>> {
    const stockMovement = await this.stockMovementsRepository.findOne({
      where: { id },
    });

    if (!stockMovement) throw new NotFoundException('Stock movement not found');

    Object.assign(stockMovement, body);

    try {
      const updatedStockMovement =
        await this.stockMovementsRepository.save(stockMovement);

      return {
        data: updatedStockMovement,
        message: 'Stock movement updated successfully',
      };
    } catch (error: unknown) {
      console.error(error);
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Stock movement already exists');
      }
      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<StockMovementDto>> {
    const stockMovement = await this.stockMovementsRepository.findOne({
      where: { id },
    });

    if (!stockMovement) throw new NotFoundException('Stock movement not found');

    const removedStock =
      await this.stockMovementsRepository.remove(stockMovement);

    if (!removedStock)
      throw new ConflictException('Failed to removed stock movement');

    return {
      data: removedStock,
      message: 'Stock movement removed successfully',
    };
  }

  async createOutMovementManager(
    manager: EntityManager,
    payload: CreateOutMovementPayloadType,
  ): Promise<StockMovements> {
    const movement = manager.create(StockMovements, {
      productId: payload.productId,
      unitType: payload.unitType,
      qtyBefore: payload.qtyBefore,
      qtyChange: payload.qtyChange,
      qtyAfter: payload.qtyAfter,
      type: StockMovementsType.OUT,
      referenceType: StockMovementReferenceType.INVOICE,
      referenceId: payload.referenceId,
    });

    return manager.save(movement);
  }
}
