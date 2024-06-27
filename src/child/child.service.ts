import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { CreateChildArgs, DeleteChildArgs } from './dto';

@Injectable()
export class ChildService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 자식 컴포넌트 목록 조회
  findManyChild(componentId: number) {
    return this.prisma.child.findMany({
      where: { componentId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 자식 컴포넌트 생성
  async createChild({ componentId }: CreateChildArgs) {
    await this.prisma.child.create({
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

  // 자식 컴포넌트 삭제
  async deleteChild({ id }: DeleteChildArgs) {
    await this.prisma.child.update({
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
