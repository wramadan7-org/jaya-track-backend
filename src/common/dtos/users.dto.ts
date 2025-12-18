import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Roles } from 'src/roles/roles.entity';

export class UserDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsUUID(4)
  roleId?: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsOptional()
  @IsStrongPassword()
  password?: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  role?: Roles;
  @IsOptional()
  @IsDate()
  createdAt: Date;
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
}

export class FindOneUserDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsDate()
  createdAt: Date;
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  username: string;
}

export class ChangePasswordUserDto {
  @IsString()
  oldPassword: string;
  @IsStrongPassword()
  newPassword: string;
  @IsStrongPassword()
  confirmNewPassword: string;
}
