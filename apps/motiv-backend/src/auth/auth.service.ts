import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email/email.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

import { SignUpDto } from './dto/signup.dto';
import { InvitedSignUpDto } from './dto/invited-signup.dto';

  async signup(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const verificationToken = randomBytes(32).toString('hex');
    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
        verificationToken,
      },
    });

    const verificationLink = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
    await this.emailService.sendMail(
      user.email,
      'Verify your email',
      `Click here to verify your email: ${verificationLink}`,
      `<p>Click here to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    );

    const { password, ...result } = user;
    return result;
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid verification token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null },
    });

    return { message: 'Email verified successfully' };
  }

  async invitedSignUp(invitedSignUpDto: InvitedSignUpDto) {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: invitedSignUpDto.token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid invitation token');
    }

    const hashedPassword = await bcrypt.hash(invitedSignUpDto.password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        firstName: invitedSignUpDto.firstName,
        lastName: invitedSignUpDto.lastName,
        isVerified: true,
        verificationToken: null,
      },
    });

    return { message: 'Signup successful' };
  }
}
