import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockUnitType } from './stocks.enum';

@Entity()
export class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'product_id', unique: true })
  productId: string;
  @Column()
  qty: number;
  @Column({
    type: 'enum',
    enum: StockUnitType,
    default: StockUnitType.DOZENS,
    enumName: 'unit_type',
  })
  unitType: StockUnitType;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
