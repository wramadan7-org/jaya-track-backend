import { Transform } from 'class-transformer';
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
import { StockUnitType } from 'src/stocks/stocks.enum';

export class SaleItemDto {
  id: string;
  salesId: string;
  productId: string;
  unitType: StockUnitType;
  qty: number;
  price: number;
  subtotal: number;
  fillPerSack: number;
  product?: Products;
  sales?: Sales;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateSaleItemDto {
  @IsUUID(4)
  salesId: string;
  @IsUUID(4)
  productId: string;
  @Transform(({ value }: { value: StockUnitType }) => value?.toUpperCase())
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsNumber()
  fillPerSack: number;
  @IsNumber()
  qty: number;
  @IsNumber()
  price: number;
  @IsNumber()
  subtotal: number;
}

export class FindOneSaleItemDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  salesId: string;
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @Transform(({ value }: { value: StockUnitType }) => value?.toUpperCase())
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsOptional()
  @IsString()
  productName: string;
  @IsOptional()
  @Transform(({ value }: { value: SalesStatus }) => value?.toUpperCase())
  @IsEnum(SalesStatus, {
    message: 'saleStatus must be either PAID/PARTIAL/UNPAID',
  })
  saleStatus: SalesStatus;
  @IsOptional()
  @IsString()
  storeName: string;
}

export class UpdateSaleItemDto {
  @IsOptional()
  @IsUUID(4)
  salesId: string;
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @Transform(({ value }: { value: StockUnitType }) => value?.toUpperCase())
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
  @IsNumber()
  fillPerSack: number;
  @IsOptional()
  @IsNumber()
  qty: number;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsNumber()
  subtotal: number;
}
