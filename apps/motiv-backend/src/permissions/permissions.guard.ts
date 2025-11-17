import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const userPermissions = await this.prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        userGroups: {
          include: {
            permissions: true,
          },
        },
      },
    });

    const hasPermission = () =>
      userPermissions.userGroups.some((group) =>
        group.permissions.some((p) =>
          permissions.includes(`${p.module}:${p.action}`)
        )
      );

    return hasPermission();
  }
}
