import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaymentDetails } from 'src/payment-details/payment-details.entity';
import { PaymentMethod } from 'src/payments/payments.enum';
import { Shops } from 'src/shops/shops.entity';

export class PaymentDto {
  id: string;
  storeId: string;
  amountPaid: number;
  method: PaymentMethod;
  note: string;
  store?: Shops;
  details?: PaymentDetails[];
  createdAt: Date;
  updatedAt: Date;
}

export class CreatePaymentDto {
  @IsUUID(4)
  storeId: string;
  @IsNumber()
  amountPaid: number;
  @Transform(({ value }: { value: PaymentMethod }) => value?.toUpperCase())
  @IsEnum(PaymentMethod, { message: 'method must be either CASH or TRANSFER' })
  method: PaymentMethod;
  @IsOptional()
  @IsString()
  note?: string;
}

export class FindOnePaymentDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  storeId: string;
  @IsOptional()
  @Transform(({ value }: { value: PaymentMethod }) => value?.toUpperCase())
  @IsEnum(PaymentMethod, { message: 'method must be either CASH or TRANSFER' })
  method: PaymentMethod;
  @IsOptional()
  @IsString()
  note: string;
  @IsOptional()
  @IsString()
  storeName: string;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsUUID(4)
  storeId?: string;
  @IsOptional()
  @IsNumber()
  amountPaid?: number;
  @IsOptional()
  @Transform(({ value }: { value: PaymentMethod }) => value?.toUpperCase())
  @IsEnum(PaymentMethod, { message: 'method must be either CASH or TRANSFER' })
  method?: PaymentMethod;
  @IsOptional()
  @IsString()
  note?: string;
}
