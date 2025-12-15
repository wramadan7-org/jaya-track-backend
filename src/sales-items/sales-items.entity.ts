import { StockUnitType } from 'src/stocks/stocks.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sales_items' })
export class SalesItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'sales_id' })
  salesId: string;
  @Column({ name: 'product_id' })
  productId: string;
  @Column({
    type: 'enum',
    enum: StockUnitType,
    default: StockUnitType.DOZENS,
    enumName: 'unit_type',
  })
  unitType: StockUnitType;
  @Column({ type: 'int' })
  qty: number;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  subtotal: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
