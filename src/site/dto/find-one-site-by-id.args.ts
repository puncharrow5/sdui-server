import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { SiteEntity } from 'libs/entity/src';

@InputType()
export class FindOneSiteByIdArgs extends PickType(SiteEntity, ['id']) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 ID를 입력해주세요.' })
  id: number;
}
