import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from './payments.entity';
import { QueryFailedError, Repository } from 'typeorm';
import {
  CreatePaymentDto,
  FindOnePaymentDto,
  PaymentDto,
  UpdatePaymentDto,
} from 'src/common/dtos/payments.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>,
  ) {}

  async create(body: CreatePaymentDto): Promise<ResponseDto<PaymentDto>> {
    const payment = this.paymentsRepository.create(body);

    try {
      const savedPayment = await this.paymentsRepository.save(payment);

      return { data: savedPayment, message: 'Payment created successfully' };
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          'Failed to create payment. Please check the provided data.',
        );
      }

      throw error;
    }
  }

  async findAll(
    filter: Partial<FindOnePaymentDto>,
  ): Promise<ResponseDto<PaymentDto[]>> {
    const qb = this.paymentsRepository
      .createQueryBuilder('payments')
      .leftJoinAndSelect('payments.store', 'shops')
      .leftJoinAndSelect('payments.details', 'payment_details');

    if (filter.id) {
      qb.andWhere('payments.id = :id', { id: filter.id });
    }

    if (filter.storeId) {
      qb.andWhere('payments.storeId = :storeId', { storeId: filter.storeId });
    }

    if (filter.method) {
      qb.andWhere('payments.method = :method', { method: filter.method });
    }

    if (filter.note) {
      qb.andWhere('LOWER(payments.note) LIKE LOWER(:note)', {
        note: filter.note,
      });
    }

    if (filter.storeName) {
      qb.andWhere('LOWER(shops.name) LIKE LOWER(:storeName)', {
        storeName: filter.storeName,
      });
    }

    const payments = await qb.getMany();

    return { data: payments, message: 'Payments retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOnePaymentDto>,
  ): Promise<ResponseDto<PaymentDto>> {
    const qb = this.paymentsRepository
      .createQueryBuilder('payments')
      .leftJoinAndSelect('payments.store', 'shops')
      .leftJoinAndSelect('payments.details', 'payment_details');

    if (params.id) {
      qb.andWhere('payments.id = :id', { id: params.id });
    }

    if (params.storeId) {
      qb.andWhere('payments.storeId = :storeId', { storeId: params.storeId });
    }

    if (params.method) {
      qb.andWhere('payments.method = :method', { method: params.method });
    }

    if (params.note) {
      qb.andWhere('LOWER(payments.note) LIKE LOWER(:note)', {
        note: params.note,
      });
    }

    if (params.storeName) {
      qb.andWhere('LOWER(shops.name) LIKE LOWER(:storeName)', {
        storeName: params.storeName,
      });
    }

    const payment = await qb.getOne();

    if (!payment) throw new NotFoundException('Payment not found');

    return { data: payment, message: 'Payment retrieved successfully' };
  }

  async update(
    id: string,
    body: UpdatePaymentDto,
  ): Promise<ResponseDto<PaymentDto>> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });

    if (!payment) throw new NotFoundException('Payment not found');

    Object.assign(payment, body);

    try {
      const updatedPayment = await this.paymentsRepository.save(payment);

      return { data: updatedPayment, message: 'Payment updated successfully' };
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          'Failed to update payment. Please check the provided data.',
        );
      }

      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<PaymentDto>> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });

    if (!payment) throw new NotFoundException('Payment not found');

    try {
      const deletedPayment = await this.paymentsRepository.remove(payment);

      return { data: deletedPayment, message: 'Payment deleted successfully' };
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof QueryFailedError) {
        throw new ConflictException(
          'Failed to delete payment. It may be referenced by other records.',
        );
      }

      throw error;
    }
  }
}
