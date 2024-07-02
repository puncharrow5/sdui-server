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

      const createStyleEntity = async (entity) => {
        await entity.create({
          data: {
            component: {
              connect: {
                id: component.id,
              },
            },
          },
        });
      };

      await createStyleEntity(tx.componentStyle);
      await createStyleEntity(tx.componentMobileStyle);
      await createStyleEntity(tx.titleStyle);
      await createStyleEntity(tx.contentStyle);
    });

    return true;
  }

  // 컴포넌트 수정
  async updateComponent({
    id,
    name,
    componentStyle,
    componentMobileStyle,
    title,
    mobileTitle,
    titleStyle,
    content,
    mobileContent,
    contentStyle,
    imageFile,
    mobileImageFile,
  }: UpdateComponentArgs) {
    let newBackground = componentStyle?.background;
    let newMobileBackground = componentMobileStyle?.background;

    if (componentStyle?.backgroundType === 'IMAGE' && imageFile) {
      const [backgroundFile] = await Promise.all([imageFile]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        backgroundFile.createReadStream(),
        backgroundFile.filename,
        bucket,
      );

      newBackground = uploadedFile.Key;
    }

    if (componentMobileStyle?.backgroundType === 'IMAGE' && mobileImageFile) {
      const [backgroundFile] = await Promise.all([mobileImageFile]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        backgroundFile.createReadStream(),
        backgroundFile.filename,
        bucket,
      );

      newMobileBackground = uploadedFile.Key;
    }

    await this.prisma.component.update({
      where: { id },
      data: {
        name,
        title,
        mobileTitle,
        content,
        mobileContent,
        componentStyle: {
          update: { ...componentStyle, background: newBackground },
        },
        componentMobileStyle: {
          update: { ...componentMobileStyle, background: newMobileBackground },
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
