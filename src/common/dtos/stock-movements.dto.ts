import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Products } from 'src/products/products.entity';
import { Sales } from 'src/sales/sales.entity';
import { SalesStatus } from 'src/sales/sales.enum';
import {
  StockMovementReferenceType,
  StockMovementsType,
} from 'src/stock-movements/stock-movements.enum';
import { StockUnitType } from 'src/stocks/stocks.enum';

export class StockMovementDto {
  id: string;
  productId: string;
  unitType: StockUnitType;
  qtyBefore: number;
  qtyChange: number;
  qtyAfter: number;
  type: StockMovementsType;
  referenceType: StockMovementReferenceType;
  referenceId: string | null;
  product: Products;
  sales?: Sales;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateStockMovementDto {
  @IsUUID(4)
  productId: string;
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsNumber()
  qtyBefore: number;
  @IsNumber()
  qtyChange: number;
  @IsNumber()
  qtyAfter: number;
  @IsEnum(StockMovementsType, {
    message: 'type must be either IN/OUT/RETURN/ADJUSTMENT',
  })
  type: StockMovementsType;
  @IsEnum(StockMovementReferenceType, {
    message:
      'referenceType must be either INVOICE/PURCHASE_ORDER/STOCK_ADJUSTMENT',
  })
  referenceType: StockMovementReferenceType;
  @IsOptional()
  @IsUUID(4)
  referenceId: string;
}

export class FindOneStockMovementDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @IsString()
  productName: string;
  @IsOptional()
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsOptional()
  @IsEnum(StockMovementsType, {
    message: 'type must be either IN/OUT/RETURN/ADJUSTMENT',
  })
  type: StockMovementsType;
  @IsOptional()
  @IsEnum(StockMovementReferenceType, {
    message:
      'referenceType must be either INVOICE/PURCHASE_ORDER/STOCK_ADJUSTMENT',
  })
  referenceType: StockMovementReferenceType;
  @IsOptional()
  @IsUUID(4)
  referenceId: string;
  @IsOptional()
  @IsEnum(SalesStatus, { message: 'status must be either PAID/PARTIAL/UNPAID' })
  salesStatus: SalesStatus;
}

export class UpdateStockMovementDto {
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsOptional()
  @IsNumber()
  qtyBefore: number;
  @IsOptional()
  @IsNumber()
  qtyChange: number;
  @IsOptional()
  @IsNumber()
  qtyAfter: number;
  @IsOptional()
  @IsEnum(StockMovementsType, {
    message: 'type must be either IN/OUT/RETURN/ADJUSTMENT',
  })
  type: StockMovementsType;
  @IsOptional()
  @IsEnum(StockMovementReferenceType, {
    message:
      'referenceType must be either INVOICE/PURCHASE_ORDER/STOCK_ADJUSTMENT',
  })
  referenceType: StockMovementReferenceType;
  @IsOptional()
  @IsUUID(4)
  referenceId: string;
}
