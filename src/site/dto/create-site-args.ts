import {
  InputType,
  Int,
  Field,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { AdminEntity, SiteEntity } from '@libs/entity';

@InputType()
export class CreateSiteArgs extends IntersectionType(
  PickType(SiteEntity, ['domain', 'email']),
  PickType(AdminEntity, ['id']),
) {
  @Field({ description: '관리자 ID' })
  @IsInt({ message: '올바른 형식의 관리자 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '도메인' })
  @IsString({ message: '올바른 형식의 도메인을 입력해주세요.' })
  domain: string;

  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  email: string;
}
