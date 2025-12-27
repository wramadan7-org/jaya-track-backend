import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetails } from './payment-details.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreatePaymentDetailDto } from 'src/common/dtos/payment-details.dto';
import { SalesService } from 'src/sales/sales.service';

@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectRepository(PaymentDetails)
    private paymentDetailsRepository: Repository<PaymentDetails>,
    private salesService: SalesService,
  ) {}

  async createManager(
    manager: EntityManager,
    body: CreatePaymentDetailDto,
  ): Promise<PaymentDetails> {
    const paymentDetail = this.paymentDetailsRepository.create(body);

    await this.salesService.validateSaleForUpdateStatusAndPaidAmountManager(
      manager,
      body.salesId,
      body.amount,
    );

    return await manager.save(paymentDetail);
  }
}
