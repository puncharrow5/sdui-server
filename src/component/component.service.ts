import { Injectable } from '@nestjs/common';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { PrismaService } from 'nestjs-prisma';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ComponentService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

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

      await tx.componentStyle.create({
        data: {
          component: {
            connect: {
              id: component.id,
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
    name,
    componentStyle,
    title,
    titleStyle,
    content,
    contentStyle,
    file,
  }: UpdateComponentArgs) {
    let newBackground = componentStyle.background;

    if (componentStyle.backgroundType === 'IMAGE' && file) {
      const [backgroundFile] = await Promise.all([file]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        backgroundFile.createReadStream(),
        backgroundFile.filename,
        bucket,
      );

      newBackground = uploadedFile.Key;
    }

    await this.prisma.component.update({
      where: { id },
      data: {
        name,
        title,
        content,
        componentStyle: {
          update: { ...componentStyle, background: newBackground },
        },
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
