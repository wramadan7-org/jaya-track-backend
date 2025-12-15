import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SalesStatus } from './sales.enum';

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
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
