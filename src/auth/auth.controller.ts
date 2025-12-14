import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ChangePasswordDto,
  ConfirmationEmailToChangePasswordDto,
  ForgotPasswordDto,
} from '../common/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Patch(':id/change-password')
  changePassword(@Param('id') id: string, @Body() body: ChangePasswordDto) {
    return this.authService.updatePassword(
      id,
      body.oldPassword,
      body.newPassword,
      body.confirmNewPassword,
    );
  }

  @Post('confirm-email')
  confirmEmailForgotPassword(
    @Body() body: ConfirmationEmailToChangePasswordDto,
  ) {
    return this.authService.confirmEmailToChangePassword(body.email);
  }

  @Patch('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }
}
