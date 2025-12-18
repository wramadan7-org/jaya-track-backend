import { Users } from 'src/users/users.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column({ name: 'name_normalized', unique: true })
  nameNormalized: string;
  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    this.nameNormalized = this.name.toLowerCase().trim().replace(/\s+/g, ' ');
  }
  @OneToMany(() => Users, (user) => user.roleId)
  users: Users[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
