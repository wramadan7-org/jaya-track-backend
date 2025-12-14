import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/common/utils/bcrypt';
import { UserDto } from 'src/common/dtos/users.dto';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import {
  ChangePasswordDto,
  ConfirmationEmailToChangePasswordDto,
  ForgotPasswordDto,
} from '../common/dtos/auth.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  confirmEmailToChangePassword(
    email: ConfirmationEmailToChangePasswordDto['email'],
  ): ResponseDto<null> {
    console.log('Email to retrive link change password', email);

    return {
      data: null,
      message: 'Link to change password already. Pleace check you`r email!',
    };
  }

  async forgotPassword(body: ForgotPasswordDto): Promise<ResponseDto<UserDto>> {
    const { email, newPassword, confirmPassword } = body;

    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) throw new NotFoundException('User not found');

    if (newPassword !== confirmPassword)
      throw new BadRequestException(
        'New password and confirm new password do not match',
      );

    const hashedNewPassword = await hashPassword(newPassword);

    if (!hashedNewPassword)
      throw new ConflictException('Failed to hash password');

    user.password = hashedNewPassword;

    const updatedUser = await this.userRepository.save(user);

    return { data: updatedUser, message: 'Password updated successfully' };
  }

  async updatePassword(
    id: string,
    oldPassword: ChangePasswordDto['oldPassword'],
    newPassword: ChangePasswordDto['newPassword'],
    confirmNewPassword: ChangePasswordDto['confirmNewPassword'],
  ): Promise<ResponseDto<UserDto>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isOldPasswordValid = await comparePassword(
      oldPassword,
      user.password,
    );

    if (!isOldPasswordValid)
      throw new BadRequestException('Old password is incorrect');

    if (newPassword !== confirmNewPassword)
      throw new BadRequestException(
        'New password and confirm new password do not match',
      );

    const hashedNewPassword = await hashPassword(newPassword);

    if (!hashedNewPassword)
      throw new ConflictException('Failed to hash password');

    user.password = hashedNewPassword;

    const updatedUser = await this.userRepository.save(user);

    return { data: updatedUser, message: 'Password updated successfully' };
  }
}
