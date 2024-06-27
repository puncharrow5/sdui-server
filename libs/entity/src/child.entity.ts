import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Child } from '@prisma/client';

@ObjectType({ description: '자식 컴포넌트' })
export class ChildEntity implements Child {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '이미지', nullable: true })
  image: string | null;

  @Field({ description: '너비', nullable: true })
  width: string | null;

  @Field({ description: '높이', nullable: true })
  height: string | null;

  @Field({ description: '마진', nullable: true })
  margin: string | null;

  @Field({ description: '삭제 여부' })
  isDelete: boolean;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
