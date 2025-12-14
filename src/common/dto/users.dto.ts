/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class UserDto {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  createdAt: Date;
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
