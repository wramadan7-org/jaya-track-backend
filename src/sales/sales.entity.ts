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
import { StockMovements } from 'src/stock-movements/stock-movements.entity';
import { SalesItems } from 'src/sales-items/sales-items.entity';

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
  @OneToMany(() => StockMovements, (sm) => sm.sales)
  stock_movements: StockMovements[];
  @OneToMany(() => SalesItems, (item) => item.sales)
  items: SalesItems[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
