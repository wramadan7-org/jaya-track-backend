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
import { StockMovementsService } from './stock-movements.service';
import {
  CreateStockMovementDto,
  FindOneStockMovementDto,
  UpdateStockMovementDto,
} from 'src/common/dtos/stock-movements.dto';

@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  create(@Body() body: CreateStockMovementDto) {
    return this.stockMovementsService.create(body);
  }

  @Get()
  findAll(@Query() query: FindOneStockMovementDto) {
    return this.stockMovementsService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.stockMovementsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateStockMovementDto) {
    return this.stockMovementsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.stockMovementsService.delete(id);
  }
}
