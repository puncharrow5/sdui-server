import { Injectable } from '@nestjs/common';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  // 컴포넌트 목록 조회
  findManyComponent(siteId: number) {
    return this.prisma.component.findMany({
      where: { siteId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 컴포넌트 생성
  async createComponent({ siteId, componentType, name }: CreateComponentArgs) {
    await this.prisma.$transaction(async (tx) => {
      const component = await tx.component.create({
        data: {
          componentType,
          name,
          site: {
            connect: {
              id: siteId,
            },
          },
        },
      });

      await tx.titleStyle.create({
        data: {
          component: {
            connect: {
              id: component.id,
            },
          },
        },
      });

      await tx.contentStyle.create({
        data: {
          component: {
            connect: {
              id: component.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 컴포넌트 수정
  async updateComponent({
    id,
    title,
    content,
    background,
    backgroundType,
    titleStyle,
    contentStyle,
  }: UpdateComponentArgs) {
    await this.prisma.component.update({
      where: { id },
      data: {
        title,
        content,
        background,
        backgroundType,
        titleStyle: { update: { ...titleStyle } },
        contentStyle: { update: { ...contentStyle } },
      },
    });

    return true;
  }

  // 컴포넌트 삭제
  async deleteComponent({ id }: DeleteComponentArgs) {
    await this.prisma.component.update({
      where: {
        id,
      },
      data: {
        isDelete: true,
      },
    });

    return true;
  }
}
