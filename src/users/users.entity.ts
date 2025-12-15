import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'role_id', nullable: true })
  roleId: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  username: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ select: false })
  password: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
