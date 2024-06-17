import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SiteAdmin } from '@prisma/client';

@ObjectType({ description: '사이트-관리자' })
export class SiteAdminEntity implements SiteAdmin {
  @Field(() => Int, { description: '관리자 ID' })
  adminId: number;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
