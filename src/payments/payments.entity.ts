import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from './payments.enum';
import { Shops } from 'src/shops/shops.entity';
import { PaymentDetails } from 'src/payment-details/payment-details.entity';

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
  @Column({ nullable: true })
  note: string;
  @ManyToOne(() => Shops, (shop) => shop.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  store: Shops;
  @OneToMany(() => PaymentDetails, (detail) => detail.payment)
  details: PaymentDetails[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
