import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateHeaderArgs, UpdateMobileHeaderArgs } from './dto';
import { FileService } from 'src/file/file.service';
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

  // 모바일 헤더 조회
  findMobileHeader(siteId: number) {
    return this.prisma.mobileHeader.findUnique({
      where: { siteId },
    });
  }

  // 헤더 업데이트
  async updateHeader({
    siteId,
    logoSize,
    height,
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
        logoSize,
        height,
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
        logoSize,
        height,
        backgroundColor,
        textColor,
        textSize,
      },
    });

    return true;
  }

  // 모바일 헤더 업데이트
  async updateMobileHeader({
    siteId,
    logoSize,
    buttonSize,
    height,
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
    textColor,
    textSize,
    border,
    logoFile,
    buttonFile,
  }: UpdateMobileHeaderArgs) {
    let logo;

    if (logoFile) {
      const [newLogo] = await Promise.all([logoFile]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        newLogo.createReadStream(),
        newLogo.filename,
        bucket,
      );

      logo = uploadedFile.Key;
    }

    let button;

    if (buttonFile) {
      const [newButton] = await Promise.all([buttonFile]);

      const bucket = this.configService.get('AWS_S3_BUCKET');
      const uploadedFile = await this.fileService.uploadFile(
        newButton.createReadStream(),
        newButton.filename,
        bucket,
      );

      button = uploadedFile.Key;
    }

    await this.prisma.mobileHeader.upsert({
      where: {
        siteId,
      },
      create: {
        logo,
        logoSize,
        button,
        buttonSize,
        height,
        paddingHorizontal,
        paddingVertical,
        backgroundColor,
        textColor,
        textSize,
        border,
        site: {
          connect: {
            id: siteId,
          },
        },
      },
      update: {
        logo,
        logoSize,
        button,
        buttonSize,
        height,
        paddingHorizontal,
        paddingVertical,
        backgroundColor,
        textColor,
        textSize,
        border,
      },
    });

    return true;
  }
}
