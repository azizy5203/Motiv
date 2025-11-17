import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({ data: createPageDto });
  }

  async findAll() {
    return this.prisma.page.findMany({ include: { children: true } });
  }

  async findOne(id: string) {
    return this.prisma.page.findUnique({ where: { id }, include: { children: true } });
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({ where: { id }, data: updatePageDto });
  }

  async remove(id: string) {
    return this.prisma.page.delete({ where: { id } });
  }
}
