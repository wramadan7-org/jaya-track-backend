import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SalesItemsService } from './sales-items.service';
import {
  CreateSaleItemDto,
  FindOneSaleItemDto,
} from 'src/common/dtos/sales-items.dto';

@Controller('sales-items')
export class SalesItemsController {
  constructor(private readonly saleItemsService: SalesItemsService) {}

  @Post()
  create(@Body() body: CreateSaleItemDto) {
    return this.saleItemsService.create(body);
  }

  @Get()
  findAll(@Query() query: FindOneSaleItemDto) {
    return this.saleItemsService.findAll(query);
  }
}
