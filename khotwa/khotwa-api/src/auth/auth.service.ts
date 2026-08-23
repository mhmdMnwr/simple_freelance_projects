import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './admin.schema';
import { ChangePasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin._id.toString(), username: admin.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changePassword(
    adminId: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const admin = await this.adminModel.findById(adminId).exec();
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    const isOldPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      admin.password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(dto.newPassword, salt);
    await admin.save();

    return { message: 'Password changed successfully' };
  }
}
