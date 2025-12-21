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
import { SalesService } from './sales.service';
import {
  CreateSaleDto,
  FindOneSaleDto,
  UpdateSaleDto,
} from 'src/common/dtos/sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() body: CreateSaleDto) {
    return this.salesService.create(body);
  }

  @Get()
  findAll(@Query() query: FindOneSaleDto) {
    return this.salesService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.salesService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateSaleDto) {
    return this.salesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.salesService.delete(id);
  }
}
