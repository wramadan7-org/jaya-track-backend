import { Payments } from 'src/payments/payments.entity';
import { Sales } from 'src/sales/sales.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Shops {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  area: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @OneToMany(() => Sales, (sale) => sale)
  sales: Sales[];
  @OneToMany(() => Payments, (payment) => payment.store)
  payments: Payments[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
