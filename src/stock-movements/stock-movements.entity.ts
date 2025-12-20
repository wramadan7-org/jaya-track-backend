import { StockUnitType } from 'src/stocks/stocks.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  StockMovementReferenceType,
  StockMovementsType,
} from './stock-movements.enum';
import { Products } from 'src/products/products.entity';

@Entity({ name: 'stock_movements' })
export class StockMovements {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'product_id' })
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
  referenceType: StockMovementReferenceType;
  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  referenceId: string | null;
  @ManyToOne(() => Products, (product) => product.stockMovements, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Products;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
