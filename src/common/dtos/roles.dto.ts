import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Users } from 'src/users/users.entity';

export class RoleDto {
  @IsUUID(4)
  id: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  nameNormalized?: string;
  @IsOptional()
  users?: Users[];
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}

export class CreateAndUpdateRoleDto {
  @IsString()
  name: string;
}

export class FindOneRoleDto {
  @IsOptional()
  @IsUUID(4)
  id: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  nameNormalized?: string;
  @IsOptional()
  users?: Users[];
}
