import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { SiteEntity } from 'libs/entity/src';

@InputType()
export class FindOneSiteByDomainArgs extends PickType(SiteEntity, ['domain']) {
  @Field({ description: '도메인' })
  @IsString({ message: '올바른 형식의 도메인을 입력해주세요.' })
  domain: string;
}
