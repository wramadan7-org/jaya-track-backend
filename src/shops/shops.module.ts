import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shops } from './shops.entity';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shops])],
  providers: [ShopsService],
  controllers: [ShopsController],
  exports: [ShopsService, TypeOrmModule],
})
export class ShopsModule {}
