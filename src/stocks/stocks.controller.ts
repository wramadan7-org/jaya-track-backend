import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import {
  CreateStockDto,
  FindOneStockDto,
  UpdateStockDto,
} from 'src/common/dtos/stocks.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Post()
  create(@Body() body: CreateStockDto) {
    return this.stockService.create(body);
  }

  @Get()
  findAll(@Query() query: FindOneStockDto) {
    return this.stockService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.stockService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateStockDto) {
    return this.stockService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.stockService.delete(id);
  }
}
