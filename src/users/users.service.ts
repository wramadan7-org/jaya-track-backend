import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateUserDto,
  FindOneUserDto,
  UpdateUserDto,
  UserDto,
} from '../common/dtos/users.dto';
import { hashPassword } from 'src/common/utils/bcrypt';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(body: CreateUserDto): Promise<ResponseDto<UserDto>> {
    const emailExists = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (emailExists) throw new BadRequestException('Email already exists');

    const usernameExists = await this.userRepository.findOne({
      where: { username: body.username },
    });

    if (usernameExists)
      throw new BadRequestException('Username already exists');

    const hashedPassword = await hashPassword(body.password);

    if (!hashedPassword) throw new ConflictException('Failed to hash password');

    body.password = hashedPassword;

    const user = await this.userRepository.save(body);

    if (!user) throw new ConflictException('Failed to create user');

    return { data: user, message: 'User create successfully' };
  }

  async findAll(
    filter: Partial<FindOneUserDto>,
  ): Promise<ResponseDto<UserDto[]>> {
    const where: FindOptionsWhere<Users> = {};

    if (filter.username) {
      where.username = ILike(`%${filter.username}%`);
    }

    if (filter.email) {
      where.email = ILike(`%${filter.email}%`);
    }

    if (filter.id) {
      where.id = filter.id;
    }

    const users = await this.userRepository.find({ where });

    return { data: users, message: 'Users retrieved successfully' };
  }

  async findOne(
    params: Partial<FindOneUserDto>,
  ): Promise<ResponseDto<UserDto>> {
    const user = await this.userRepository.findOne({ where: params });

    if (!user) throw new NotFoundException('User not found');

    return { data: user, message: 'User retrieved successfully' };
  }

  async update(
    id: string,
    body: Partial<UpdateUserDto>,
  ): Promise<ResponseDto<UserDto>> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, body);

    const updatedUser = await this.userRepository.save(user);

    return { data: updatedUser, message: 'User updated successfully' };
  }
}
