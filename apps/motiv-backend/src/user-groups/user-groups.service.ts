import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Injectable()
export class UserGroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createUserGroupDto: CreateUserGroupDto) {
    return this.prisma.userGroup.create({ data: createUserGroupDto });
  }

  async findAll() {
    return this.prisma.userGroup.findMany();
  }

  async findOne(id: string) {
    return this.prisma.userGroup.findUnique({ where: { id } });
  }

  async update(id: string, updateUserGroupDto: UpdateUserGroupDto) {
    return this.prisma.userGroup.update({ where: { id }, data: updateUserGroupDto });
  }

  async remove(id: string) {
    return this.prisma.userGroup.delete({ where: { id } });
  }
}
