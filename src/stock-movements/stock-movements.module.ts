import { Module } from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import { StockMovementsController } from './stock-movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovements } from './stock-movements.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockMovements])],
  providers: [StockMovementsService],
  controllers: [StockMovementsController],
  exports: [StockMovementsService, TypeOrmModule],
})
export class StockMovementsModule {}
