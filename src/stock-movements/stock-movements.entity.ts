import { StockUnitType } from 'src/stocks/stocks.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  StockMovementReferenceType,
  StockMovementsType,
} from './stock-movements.enum';

@Entity({ name: 'stock_movements' })
export class StockMovements {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'product_id', unique: true })
  productId: string;
  @Column({
    type: 'enum',
    enum: StockUnitType,
    default: StockUnitType.DOZENS,
    enumName: 'unit_type',
  })
  unitType: StockUnitType;
  @Column({ name: 'qty_before', type: 'int' })
  qtyBefore: number;
  @Column({ name: 'qty_change', type: 'int' })
  qtyChange: number;
  @Column({ name: 'qty_after', type: 'int' })
  qtyAfter: number;
  @Column({
    type: 'enum',
    enum: StockMovementsType,
    default: StockMovementsType.IN,
    enumName: 'type',
  })
  type: StockMovementsType;
  @Column({
    type: 'enum',
    enum: StockMovementReferenceType,
    default: StockMovementReferenceType.STOCK_ADJUSTMENT,
    enumName: 'reference_type',
  })
  referenceType: StockMovementsType;
  @Column({ name: 'reference_id', unique: true })
  referenceId: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
