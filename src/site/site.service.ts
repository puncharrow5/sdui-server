import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateSiteArgs,
  FindOneSiteByDomainArgs,
  FindOneSiteByIdArgs,
} from './dto';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  // ID로 사이트 조회
  async findOneSiteById({ id }: FindOneSiteByIdArgs) {
    const site = await this.prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      throw new BadRequestException('존재하지 않는 사이트입니다.');
    }

    return site;
  }

  // 도메인으로 사이트 조회
  async findOneSiteByDomain({ domain }: FindOneSiteByDomainArgs) {
    const site = await this.prisma.site.findUnique({
      where: { domain },
    });

    if (!site) {
      throw new BadRequestException('존재하지 않는 사이트입니다.');
    }

    return site;
  }

  // 사이트 생성
  async createSite({ domain, email }: CreateSiteArgs, adminId: number) {
    await this.prisma.$transaction(async (tx) => {
      const checkDomain = await tx.site.findUnique({
        where: { domain },
      });

      if (checkDomain) {
        throw new BadRequestException('이미 등록된 도메인입니다.');
      }

      const admin = await tx.admin.findUnique({
        where: { id: adminId },
      });

      if (!admin) {
        throw new BadRequestException('등록되지 않은 관리자입니다.');
      }

      const site = await tx.site.create({
        data: {
          email,
          domain,
        },
      });

      await tx.siteAdmin.create({
        data: { adminId, siteId: site.id },
      });
    });

    return true;
  }
}
