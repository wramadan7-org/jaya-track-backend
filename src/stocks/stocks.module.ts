import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stocks } from './stocks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks])],
  providers: [StocksService],
  controllers: [StocksController],
  exports: [StocksService, TypeOrmModule],
})
export class StocksModule {}
