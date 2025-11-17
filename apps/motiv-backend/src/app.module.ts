import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { UserGroupsModule } from './user-groups/user-groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PagesModule } from './pages/pages.module';
import { FrontendAuthModule } from './frontend-auth/frontend-auth.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    EmailModule,
    UserGroupsModule,
    PermissionsModule,
    PagesModule,
    FrontendAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
