import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  // 관리자 권한 조회
  findAdminRole(roleId: number) {
    return this.prisma.role.findUnique({
      where: { id: roleId },
    });
  }
}
