import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { FindOptionsWhere, ILike, QueryFailedError, Repository } from 'typeorm';
import {
  CreateAndUpdateRoleDto,
  FindOneRoleDto,
  RoleDto,
} from 'src/common/dtos/roles.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async create(body: CreateAndUpdateRoleDto): Promise<ResponseDto<RoleDto>> {
    const { name } = body;

    const role = this.roleRepository.create({ name });

    try {
      const saveRole = await this.roleRepository.save(role);

      return { data: saveRole, message: 'Create role successfully' };
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Role already exists');
      }

      throw error;
    }
  }

  async findAll(
    filter: Partial<FindOneRoleDto>,
  ): Promise<ResponseDto<RoleDto[]>> {
    const where: FindOptionsWhere<Roles> = {};

    if (filter.name) {
      where.name = ILike(`%${filter.name}%`);
    }

    if (filter.id) {
      where.id = filter.id;
    }

    const roles = await this.roleRepository.find({ where });

    return { data: roles, message: 'Roles retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOneRoleDto>,
  ): Promise<ResponseDto<RoleDto>> {
    const role = await this.roleRepository.findOne({ where: params });

    if (!role) throw new NotFoundException('Role not found');

    return { data: role, message: 'Role retrieved successfully' };
  }

  async update(
    id: string,
    body: Partial<CreateAndUpdateRoleDto>,
  ): Promise<ResponseDto<RoleDto>> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new NotFoundException('Role not found');

    Object.assign(role, body);

    try {
      const updatedRole = await this.roleRepository.save(role);

      if (!updatedRole) throw new ConflictException('Failed to update role');

      return { data: updatedRole, message: 'Role updated successfully' };
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Role already exists');
      }

      throw error;
    }
  }

  async delete(id: string): Promise<ResponseDto<RoleDto>> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new NotFoundException('Role not found');

    const removedRole = await this.roleRepository.remove(role);

    if (!removedRole) throw new ConflictException('Failed to remove role');

    return { data: removedRole, message: 'Role removed successfully' };
  }
}
