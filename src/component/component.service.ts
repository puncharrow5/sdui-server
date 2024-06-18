import { Injectable } from '@nestjs/common';
import { AddComponentArgs } from './dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  // 컴포넌트 목록 조회
  findManyComponent(siteId: number) {
    return this.prisma.component.findMany({
      where: { siteId },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 컴포넌트 추가
  async addComponent({
    siteId,
    componentType,
    name,
    title,
    titleStyle,
    content,
    contentStyle,
    background,
  }: AddComponentArgs) {
    await this.prisma.component.create({
      data: {
        site: {
          connect: {
            id: siteId,
          },
        },
        componentType,
        name,
        title,
        titleStyle,
        content,
        contentStyle,
        background,
      },
    });

    return true;
  }
}
