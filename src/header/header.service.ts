import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SetHeaderStyleArgs } from './dto';

@Injectable()
export class HeaderService {
  constructor(private prisma: PrismaService) {}

  // 헤더 조회
  findHeader(siteId: number) {
    return this.prisma.header.findUnique({
      where: { siteId },
    });
  }

  // 헤더 스타일 설정
  async setHeaderStyle({
    siteId,
    backgroundColor,
    textColor,
  }: SetHeaderStyleArgs) {
    await this.prisma.header.upsert({
      where: {
        siteId,
      },
      create: {
        backgroundColor,
        textColor,
        site: {
          connect: {
            id: siteId,
          },
        },
      },
      update: {
        backgroundColor,
        textColor,
      },
    });

    return true;
  }
}
