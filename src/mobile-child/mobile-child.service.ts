import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateMobileChildArgs,
  DeleteMobileChildArgs,
  UpdateMobileChildArgs,
} from './dto';

@Injectable()
export class MobileChildService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 모바일 자식 컴포넌트 목록 조회
  findManyMobileChild(componentId: number) {
    return this.prisma.mobileChild.findMany({
      where: { componentId, isDelete: false },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // 모바일 자식 컴포넌트 생성
  async createMobileChild({ componentId, childType }: CreateMobileChildArgs) {
    await this.prisma.$transaction(async (tx) => {
      const mobileChild = await tx.mobileChild.create({
        data: {
          childType,
          component: {
            connect: {
              id: componentId,
            },
          },
        },
      });

      await tx.mobileChildStyle.create({
        data: {
          mobileChild: {
            connect: {
              id: mobileChild.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 모바일 자식 컴포넌트 업데이트
  async updateMobileChild({
    id,
    title,
    content,
    mobileChildStyle,
    file,
  }: UpdateMobileChildArgs) {
    let newBackground = mobileChildStyle.background;

    if (mobileChildStyle.backgroundType === 'IMAGE' && file) {
      const [backgroundFile] = await Promise.all([file]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        backgroundFile.createReadStream(),
        backgroundFile.filename,
        bucket,
      );

      newBackground = uploadedFile.Key;
    }

    await this.prisma.mobileChild.update({
      where: { id },
      data: {
        title,
        content,
        mobileChildStyle: {
          update: { ...mobileChildStyle, background: newBackground },
        },
      },
    });

    return true;
  }

  // 모바일 자식 컴포넌트 삭제
  async deleteMobileChild({ id }: DeleteMobileChildArgs) {
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
