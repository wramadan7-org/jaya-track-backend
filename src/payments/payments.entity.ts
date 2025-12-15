import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from './payments.enum';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'store_id' })
  storeId: string;
  @Column({ name: 'amount_paid', type: 'int' })
  amountPaid: number;
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  method: PaymentMethod;
  @Column()
  note: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
