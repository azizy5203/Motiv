import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { FrontendAuthService } from './frontend-auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('frontend-auth')
export class FrontendAuthController {
  constructor(private readonly frontendAuthService: FrontendAuthService) {}

  @Get('pages')
  async getAuthorizedPages(@Request() req) {
    return this.frontendAuthService.getAuthorizedPages(req.user.userId);
  }

  @Get('actions')
  async getAuthorizedActions(@Request() req, @Query('pageCode') pageCode: string) {
    return this.frontendAuthService.getAuthorizedActions(req.user.userId, pageCode);
  }
}
