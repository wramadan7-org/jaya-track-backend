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
import { RolesService } from './roles.service';
import {
  CreateAndUpdateRoleDto,
  FindOneRoleDto,
} from 'src/common/dtos/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  create(@Body() body: CreateAndUpdateRoleDto) {
    return this.roleService.create(body);
  }

  @Get()
  findAll(@Query() query: Partial<FindOneRoleDto>) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.roleService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CreateAndUpdateRoleDto) {
    return this.roleService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
