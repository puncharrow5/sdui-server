import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class StyleService {
  constructor(private prisma: PrismaService) {}

  // 제목 스타일 조회
  findTitleStyle(componentId: number) {
    return this.prisma.titleStyle.findUnique({
      where: { componentId },
    });
  }

  // 내용 스타일 조회
  findContentStyle(componentId: number) {
    return this.prisma.contentStyle.findUnique({
      where: { componentId },
    });
  }
}
