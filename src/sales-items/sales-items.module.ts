import { Module } from '@nestjs/common';
import { SalesItemsService } from './sales-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesItems } from './sales-items.entity';
import { SalesItemsController } from './sales-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SalesItems])],
  providers: [SalesItemsService],
  controllers: [SalesItemsController],
  exports: [SalesItemsService, TypeOrmModule],
})
export class SalesItemsModule {}
