import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './sales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sales])],
  providers: [SalesService],
  controllers: [SalesController],
  exports: [TypeOrmModule],
})
export class SalesModule {}
