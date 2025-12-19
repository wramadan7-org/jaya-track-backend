import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StockUnitType } from 'src/stocks/stocks.enum';
import { ProductDto } from './products.dto';

export class StockDto {
  id: string;
  productId: string;
  qty: number;
  unitType: StockUnitType;
  product?: ProductDto;
}

export class CreateStockDto {
  @IsUUID(4)
  productId: string;
  @IsNumber()
  qty: number;
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
}

export class FindOneStockDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  qty: number;
  @IsOptional()
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: string;
}

export class UpdateStockDto {
  @IsOptional()
  @IsUUID(4)
  productId: string;
  @IsOptional()
  @IsNumber()
  qty: number;
  @IsOptional()
  @IsEnum(StockUnitType, { message: 'unitType must be either DOZENS or SACK' })
  unitType: StockUnitType;
}
