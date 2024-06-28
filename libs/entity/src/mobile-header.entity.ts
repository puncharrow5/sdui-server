import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MobileHeader } from '@prisma/client';

@ObjectType({ description: '헤더' })
export class MobileHeaderEntity implements MobileHeader {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '로고', nullable: true })
  logo: string | null;

  @Field({ description: '로고 사이즈', nullable: true })
  logoSize: string | null;

  @Field({ description: '메뉴 버튼', nullable: true })
  button: string | null;

  @Field({ description: '메뉴 버튼 사이즈', nullable: true })
  buttonSize: string | null;

  @Field(() => Int, { description: '헤더 높이', nullable: true })
  height: number | null;

  @Field({ description: '가로 패딩', nullable: true })
  paddingHorizontal: string | null;

  @Field({ description: '세로 패딩', nullable: true })
  paddingVertical: string | null;

  @Field({ description: '배경 색상', nullable: true })
  backgroundColor: string | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field({ description: '테두리', nullable: true })
  border: string | null;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
