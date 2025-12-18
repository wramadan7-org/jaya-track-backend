import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { SalesItems } from 'src/sales-items/sales-items.entity';
import { StockMovements } from 'src/stock-movements/stock-movements.entity';
import { Stocks } from 'src/stocks/stocks.entity';

export class ProductDto {
  @IsUUID(4)
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  fillPerSack: number;
  @IsNumber()
  basePrice: number;
  @IsOptional()
  stocks: Stocks[];
  @IsOptional()
  stockMovements: StockMovements[];
  @IsOptional()
  salesItems: SalesItems[];
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  fillPerSack: number;
  @IsNumber()
  basePrice: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  fillPerSack: number;
  @IsOptional()
  @IsNumber()
  basePrice: number;
}

export class FindOneProductDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsString()
  name: string;
}
