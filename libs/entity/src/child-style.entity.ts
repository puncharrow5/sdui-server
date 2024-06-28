import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BackgroundType, ChildStyle } from '@prisma/client';

@ObjectType({ description: '자식 컴포넌트 스타일' })
export class ChildStyleEntity implements ChildStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '너비', nullable: true })
  width: string | null;

  @Field({ description: '높이', nullable: true })
  height: string | null;

  @Field({ description: '마진', nullable: true })
  margin: string | null;

  @Field({ description: '패딩', nullable: true })
  padding: string | null;

  @Field({ description: '배경', nullable: true })
  background: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  backgroundType: BackgroundType | null;

  @Field({ description: '테두리', nullable: true })
  border: string | null;

  @Field({ description: '테두리 곡률', nullable: true })
  borderRadius: string | null;

  @Field(() => Int, { description: '자식컴포넌트 ID' })
  childId: number;
}
