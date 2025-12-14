/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;
  @IsStrongPassword()
  newPassword: string;
  @IsStrongPassword()
  confirmNewPassword: string;
}

export class ConfirmationEmailToChangePasswordDto {
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  newPassword: string;
  @IsStrongPassword()
  confirmPassword: string;
}
