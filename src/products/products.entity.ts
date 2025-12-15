import { SalesItems } from 'src/sales-items/sales-items.entity';
import { StockMovements } from 'src/stock-movements/stock-movements.entity';
import { Stocks } from 'src/stocks/stocks.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'int', name: 'fill_per_sack' })
  fillPerSack: number;
  @Column({ type: 'int', name: 'base_price' })
  basePrice: number;
  @OneToMany(() => Stocks, (stock) => stock.product)
  stocks: Stocks[];
  @OneToMany(() => StockMovements, (movement) => movement.product)
  stockMovements: StockMovements[];
  @OneToMany(() => SalesItems, (si) => si.product)
  sales_items: SalesItems[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
