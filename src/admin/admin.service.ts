import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import * as argon2 from 'argon2';
import { CreateAdminArgs } from './dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // 회원가입
  async createAdmin({ email, password }: CreateAdminArgs) {
    // 중복 이메일 체크
    const checkEmail = await this.prisma.admin.count({
      where: {
        email,
      },
    });

    if (checkEmail) {
      throw new BadRequestException({ message: '이미 가입된 이메일입니다.' });
    }

    const hashedPassword = await argon2.hash(password);

    await this.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return true;
  }

  // 비밀번호 확인 로직
  // isSamePassword = await argon2.verify(identityAccount.password, password);
}
