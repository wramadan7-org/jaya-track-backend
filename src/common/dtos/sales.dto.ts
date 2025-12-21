import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaymentDetails } from 'src/payment-details/payment-details.entity';
import { SalesItems } from 'src/sales-items/sales-items.entity';
import { SalesStatus } from 'src/sales/sales.enum';
import { Shops } from 'src/shops/shops.entity';

export class SaleDto {
  id: string;
  storeId: string;
  invoiceNumber: number;
  grandTotal: number;
  status: SalesStatus;
  store?: Shops;
  items?: SalesItems[];
  paymentDetails?: PaymentDetails[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreateSaleDto {
  @IsUUID(4)
  storeId: string;
  @IsNumber()
  invoiceNumber: number;
  @IsNumber()
  grandTotal: number;
  @IsEnum(SalesStatus, { message: 'status must be either PAID/PARTIAL/UNPAID' })
  status: SalesStatus;
}

export class FindOneSaleDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  storeId: string;
  @IsOptional()
  @IsNumber()
  invoiceNumber: number;
  @IsOptional()
  @IsEnum(SalesStatus, { message: 'status must be either PAID/PARTIAL/UNPAID' })
  status: SalesStatus;
  @IsOptional()
  @IsString()
  storeName: string;
  @IsOptional()
  @IsString()
  productName: string;
}

export class UpdateSaleDto {
  @IsOptional()
  @IsUUID(4)
  storeId: string;
  @IsOptional()
  @IsNumber()
  invoiceNumber: number;
  @IsOptional()
  @IsNumber()
  grandTotal: number;
  @IsOptional()
  @IsEnum(SalesStatus, { message: 'status must be either PAID/PARTIAL/UNPAID' })
  status: SalesStatus;
}
