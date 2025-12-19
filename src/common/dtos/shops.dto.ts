import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Payments } from 'src/payments/payments.entity';
import { Sales } from 'src/sales/sales.entity';

export class ShopDto {
  @IsUUID(4)
  id: string;
  @IsString()
  name: string;
  @IsString()
  area: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  sales: Sales[];
  @IsOptional()
  payments: Payments[];
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}

export class CreateShopDto {
  @IsString()
  name: string;
  @IsString()
  area: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  phone: string;
}

export class FindOneShopDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  area: string;
}

export class UpdateShopDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  area: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  phone: string;
}
