import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { CreateChildrenArgs } from './dto';

@Injectable()
export class ChildrenService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 자식 컴포넌트 목록 조회
  findManyChildren(componentId: number) {
    return this.prisma.children.findMany({
      where: { componentId },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 자식 컴포넌트 생성
  async createChildren({ componentId }: CreateChildrenArgs) {
    await this.prisma.children.create({
      data: {
        component: {
          connect: {
            id: componentId,
          },
        },
      },
    });

    return true;
  }
}
