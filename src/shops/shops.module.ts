import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shops } from './shops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shops])],
})
export class ShopsModule {}
