import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Admin, Header } from '@prisma/client';

@ObjectType({ description: '헤더' })
export class HeaderEntity implements Header {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '로고', nullable: true })
  logo: string | null;

  @Field({ description: '배경 색상', nullable: true })
  backgroundColor: string | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
