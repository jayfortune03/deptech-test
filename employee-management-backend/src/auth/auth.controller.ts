import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { HandleLeaveException } from 'src/interceptors/handleLeave.interceptor';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(loginDto);

    res.cookie('token', access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.json({ status: 200, message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentSession')
  async getCurrentSession(@Req() req: Request) {
    if (req.user) {
      return {
        status: 200,
        message: 'success get all admins',
        data: {
          id: (req.user as { id: number; email: string })?.id,
          email: (req.user as { id: number; email: string })?.email,
        },
      };
    }

    throw new HandleLeaveException(`Unauthorized`, 401);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.json({ status: 200, message: 'Logout successful' });
  }
}
