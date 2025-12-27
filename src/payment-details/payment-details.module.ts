import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetails } from './payment-details.entity';
import { SalesModule } from 'src/sales/sales.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetails]), SalesModule],
  providers: [PaymentDetailsService],
  exports: [PaymentDetailsService, TypeOrmModule],
})
export class PaymentDetailsModule {}
