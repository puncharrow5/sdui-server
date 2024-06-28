import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { CreateChildArgs, DeleteChildArgs, UpdateChildArgs } from './dto';

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
    await this.prisma.$transaction(async (tx) => {
      const child = await tx.child.create({
        data: {
          component: {
            connect: {
              id: componentId,
            },
          },
        },
      });

      await tx.childStyle.create({
        data: {
          child: {
            connect: {
              id: child.id,
            },
          },
        },
      });

      return true;
    });
  }

  // 자식 컴포넌트 업데이트
  async updateChild({ id, title, content, childStyle, file }: UpdateChildArgs) {
    let newBackground = childStyle.background;

    if (childStyle.backgroundType === 'IMAGE' && file) {
      const [backgroundFile] = await Promise.all([file]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        backgroundFile.createReadStream(),
        backgroundFile.filename,
        bucket,
      );

      newBackground = uploadedFile.Key;
    }

    await this.prisma.child.update({
      where: { id },
      data: {
        title,
        content,
        childStyle: {
          update: { ...childStyle, background: newBackground },
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
