import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SalesStatus } from './sales.enum';
import { Shops } from 'src/shops/shops.entity';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'store_id' })
  storeId: string;
  @Column({ name: 'invoice_number', type: 'int' })
  invoiceNumber: number;
  @Column({ name: 'grand_total', type: 'int' })
  grandTotal: number;
  @Column({
    type: 'enum',
    enum: SalesStatus,
    default: SalesStatus.PAID,
    enumName: 'status',
  })
  status: SalesStatus;
  @ManyToOne(() => Shops, (shop) => shop.sales, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Shops;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
