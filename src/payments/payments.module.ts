import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './payments.entity';
import { PaymentDetailsModule } from 'src/payment-details/payment-details.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payments]),
    PaymentDetailsModule,
    ShopsModule,
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
