import { Controller, Post, UseGuards, Request, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { Response } from 'express';

import { SignUpDto } from './dto/signup.dto';
import { InvitedSignUpDto } from './dto/invited-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('invited-signup')
  async invitedSignUp(@Body() invitedSignUpDto: InvitedSignUpDto) {
    return this.authService.invitedSignUp(invitedSignUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(req.user);
    response.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      // secure: true, // Uncomment in production
      sameSite: 'strict',
    });
    return { access_token: tokens.access_token };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshTokens(@Request() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.login({ id: userId, email: req.user.email });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');
    return { message: 'Logout successful' };
  }
}
