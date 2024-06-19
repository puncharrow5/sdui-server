import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BackgroundType, Component, ComponentType } from '@prisma/client';

@ObjectType({ description: '컴포넌트' })
export class ComponentEntity implements Component {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => ComponentType, { description: '컴포넌트 종류' })
  componentType: ComponentType;

  @Field({ description: '컴포넌트 이름' })
  name: string;

  @Field({ description: '제목', nullable: true })
  title: string | null;

  @Field({ description: '내용', nullable: true })
  content: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  backgroundType: BackgroundType | null;

  @Field({ description: '배경', nullable: true })
  background: string | null;

  @Field(() => Int, { description: '사이트 ID' })
  siteId: number;
}
