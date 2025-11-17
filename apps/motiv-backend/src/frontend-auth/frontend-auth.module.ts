import { Module } from '@nestjs/common';
import { FrontendAuthController } from './frontend-auth.controller';
import { FrontendAuthService } from './frontend-auth.service';

@Module({
  controllers: [FrontendAuthController],
  providers: [FrontendAuthService]
})
export class FrontendAuthModule {}
