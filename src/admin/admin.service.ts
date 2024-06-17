import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateAdminArgs, LoginWithEmailArgs } from './dto';
import { CookieOptions, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  private tokenCookieOption: CookieOptions = {
    httpOnly: true,
    path: '/',
  };

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  // AccessToken 발급
  createAccessToken(email: string, id: number) {
    const accessToken = this.jwtService.sign(
      {
        email,
        id,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: '24h',
      },
    );
    return accessToken;
  }

  // 회원가입
  async createAdmin({ email, password }: CreateAdminArgs) {
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

  // 로그인
  async loginWithEmail({ email, password }: LoginWithEmailArgs, res: Response) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new BadRequestException('이메일을 확인해주세요.');
    }

    const verifyPassword = await argon2.verify(admin.password, password);

    if (!verifyPassword) {
      throw new BadRequestException('비밀번호를 확인해주세요.');
    }

    // Access Token 생성
    const accessToken = this.createAccessToken(admin.email, admin.id);

    res.cookie('accessToken', accessToken, this.tokenCookieOption);
    //  .cookie('refreshToken', refreshToken, this.tokenCookieOption)
    //  .cookie('user', JSON.stringify(userInfo), this.userCookieOption);

    return true;
  }

  // 비밀번호 확인 로직
  // isSamePassword = await argon2.verify(identityAccount.password, password);
}
