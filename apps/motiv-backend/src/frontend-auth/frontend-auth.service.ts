import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FrontendAuthService {
  constructor(private prisma: PrismaService) {}

  async getAuthorizedPages(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userGroups: {
          include: {
            permissions: true,
          },
        },
      },
    });

    const userPermissions = user.userGroups.flatMap((group) =>
      group.permissions.map((p) => `${p.module}:${p.action}`)
    );

    const pages = await this.prisma.page.findMany({
      include: {
        children: true,
      },
    });

    const authorizedPages = this.filterPages(pages, userPermissions);
    return authorizedPages;
  }

  async getAuthorizedActions(userId: string, pageCode: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userGroups: {
          include: {
            permissions: true,
          },
        },
      },
    });

    const userPermissions = user.userGroups.flatMap((group) =>
      group.permissions.map((p) => `${p.module}:${p.action}`)
    );

    const page = await this.prisma.page.findUnique({
      where: { pageCode },
    });

    if (!page) {
      return [];
    }

    const pageActions = userPermissions
      .filter((p) => p.startsWith(`${page.pageCode}:`))
      .map((p) => p.split(':')[1]);

    return pageActions;
  }

  private filterPages(pages: any[], userPermissions: string[]) {
    return pages
      .map((page) => {
        const hasAccess = userPermissions.some((p) => p.startsWith(`${page.pageCode}:`));
        if (hasAccess) {
          if (page.children && page.children.length > 0) {
            page.children = this.filterPages(page.children, userPermissions);
          }
          return page;
        }
        return null;
      })
      .filter((page) => page !== null);
  }
}
