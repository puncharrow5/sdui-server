import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ConnectSiteArgs,
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

  // 사이트 목록 조회
  async findManySite(adminId: number) {
    return await this.prisma.site.findMany({
      where: {
        admins: {
          some: {
            adminId,
          },
        },
      },
    });
  }

  // 사이트 생성
  async createSite({ domain, name, email }: CreateSiteArgs, adminId: number) {
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
          name,
          email,
          domain,
        },
      });

      await tx.siteAdmin.create({
        data: {
          admin: {
            connect: {
              id: adminId,
            },
          },
          site: {
            connect: {
              id: site.id,
            },
          },
        },
      });
    });

    return true;
  }

  // 사이트 연결
  async connectSite({ domain }: ConnectSiteArgs, adminId: number) {
    const site = await this.prisma.site.findUnique({
      where: {
        domain,
      },
    });
    if (!site) {
      throw new BadRequestException('존재하지 않는 도메인입니다.');
    }

    const checkConnect = await this.prisma.siteAdmin.findUnique({
      where: {
        siteId_adminId: {
          adminId,
          siteId: site.id,
        },
      },
    });
    if (checkConnect) {
      throw new BadRequestException('이미 해당 계정에 등록된 사이트입니다.');
    }

    await this.prisma.siteAdmin.create({
      data: {
        admin: {
          connect: {
            id: adminId,
          },
        },
        site: {
          connect: {
            id: site.id,
          },
        },
      },
    });

    return true;
  }
}
