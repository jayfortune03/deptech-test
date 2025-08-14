import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { HandleAuthException } from 'src/interceptors/handleauth.interceptor';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new HandleAuthException('Admin is not registered!', 400);
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new HandleAuthException('Wrong password or email!', 400);
    }

    const payload = { sub: admin.id, email: admin.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
