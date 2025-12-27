import { IsNumber, IsUUID } from 'class-validator';
import { Payments } from 'src/payments/payments.entity';
import { Sales } from 'src/sales/sales.entity';

export class PaymentDetailDto {
  id: string;
  paymentId: string;
  salesId: string;
  amount: number;
  payment: Payments;
  sales: Sales;
  createdAt: Date;
  updatedAt: Date;
}

export class CreatePaymentDetailDto {
  @IsUUID(4)
  paymentId: string;
  @IsUUID(4)
  salesId: string;
  @IsNumber()
  amount: number;
}
