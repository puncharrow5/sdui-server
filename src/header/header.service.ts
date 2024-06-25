import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateHeaderArgs } from './dto';
import { FileService } from '@libs/file';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HeaderService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 헤더 조회
  findHeader(siteId: number) {
    return this.prisma.header.findUnique({
      where: { siteId },
    });
  }

  // 헤더 업데이트
  async updateHeader({
    siteId,
    backgroundColor,
    textColor,
    textSize,
    file,
  }: UpdateHeaderArgs) {
    let logo;

    if (file) {
      const [logoFile] = await Promise.all([file]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        logoFile.createReadStream(),
        logoFile.filename,
        bucket,
      );

      logo = uploadedFile.Key;
    }

    await this.prisma.header.upsert({
      where: {
        siteId,
      },
      create: {
        logo,
        backgroundColor,
        textColor,
        textSize,
        site: {
          connect: {
            id: siteId,
          },
        },
      },
      update: {
        logo,
        backgroundColor,
        textColor,
        textSize,
      },
    });

    return true;
  }
}
