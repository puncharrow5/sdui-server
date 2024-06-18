import { Field, PickType, IntersectionType, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { AdminEntity, SiteEntity } from '@libs/entity';

@ArgsType()
export class CreateSiteArgs extends PickType(SiteEntity, ['domain', 'email']) {
  @Field({ description: '도메인' })
  @IsString({ message: '올바른 형식의 도메인을 입력해주세요.' })
  domain: string;

  @Field({ description: '이메일' })
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요.' })
  email: string;
}
