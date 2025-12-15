import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockUnitType } from './stocks.enum';
import { Products } from 'src/products/products.entity';

@Entity()
export class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'product_id' })
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
  @ManyToOne(() => Products, (product) => product.stocks, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Products;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
