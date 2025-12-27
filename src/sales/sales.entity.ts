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
import { SalesStatus } from './sales.enum';
import { Shops } from 'src/shops/shops.entity';
import { SalesItems } from 'src/sales-items/sales-items.entity';
import { PaymentDetails } from 'src/payment-details/payment-details.entity';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'store_id' })
  storeId: string;
  @Column({ name: 'invoice_number', type: 'int' })
  invoiceNumber: number;
  @Column({ name: 'grand_total', type: 'int', default: 0 })
  grandTotal: number;
  @Column({ name: 'paid_amount', type: 'int', default: 0 })
  paidAmount: number;
  @Column({
    type: 'enum',
    enum: SalesStatus,
    default: SalesStatus.UNPAID,
    enumName: 'status',
  })
  status: SalesStatus;
  @ManyToOne(() => Shops, (shop) => shop.sales, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Shops;
  @OneToMany(() => SalesItems, (item) => item.sales)
  items: SalesItems[];
  @OneToMany(() => PaymentDetails, (detail) => detail.sales)
  paymentDetails: PaymentDetails[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
