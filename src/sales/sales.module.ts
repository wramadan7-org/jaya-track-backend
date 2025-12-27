import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './sales.entity';
import { SalesItemsModule } from 'src/sales-items/sales-items.module';
import { StocksModule } from 'src/stocks/stocks.module';
import { StockMovementsModule } from 'src/stock-movements/stock-movements.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sales]),
    ProductsModule,
    SalesItemsModule,
    StocksModule,
    StockMovementsModule,
  ],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [SalesService, TypeOrmModule],
})
export class SalesModule {}
