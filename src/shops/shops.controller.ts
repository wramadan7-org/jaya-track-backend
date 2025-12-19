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
import { ShopsService } from './shops.service';
import {
  CreateShopDto,
  FindOneShopDto,
  UpdateShopDto,
} from 'src/common/dtos/shops.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopService: ShopsService) {}

  @Post()
  create(@Body() body: CreateShopDto) {
    return this.shopService.create(body);
  }

  @Get()
  findAll(@Query() query: FindOneShopDto) {
    return this.shopService.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.shopService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateShopDto) {
    return this.shopService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.shopService.delete(id);
  }
}
