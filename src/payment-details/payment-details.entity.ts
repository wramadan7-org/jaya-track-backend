import { Payments } from 'src/payments/payments.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment_details' })
export class PaymentDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'payment_id' })
  paymentId: string;
  @Column({ name: 'sales_id' })
  salesId: string;
  @Column({ type: 'int' })
  amount: number;
  @ManyToOne(() => Payments, (payment) => payment.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id' })
  payment: Payments;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
