import { FileService } from 'src/file/file.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { UpdateFooterArgs } from './dto';

@Injectable()
export class FooterService {
  constructor(
    private prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // 푸터 조회
  findFooter(siteId: number) {
    return this.prisma.footer.findUnique({
      where: { siteId },
    });
  }

  // 푸터 업데이트
  async updateFooter({
    siteId,
    footerType,
    contentTop,
    helpCenter,
    terms,
    contentBottom,
    backgroundColor,
    paddingTop,
    paddingBottom,
    textColor,
    textSize,
    lineHeight,
    file,
  }: UpdateFooterArgs) {
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

    await this.prisma.footer.upsert({
      where: {
        siteId,
      },
      create: {
        footerType,
        logo,
        contentTop,
        helpCenter,
        terms,
        contentBottom,
        backgroundColor,
        paddingTop,
        paddingBottom,
        textColor,
        textSize,
        lineHeight,
        site: {
          connect: {
            id: siteId,
          },
        },
      },
      update: {
        footerType,
        logo,
        contentTop,
        helpCenter,
        terms,
        contentBottom,
        backgroundColor,
        paddingTop,
        paddingBottom,
        textColor,
        textSize,
        lineHeight,
      },
    });

    return true;
  }
}
