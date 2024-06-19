import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TitleStyle } from '@prisma/client';

@ObjectType({ description: '제목 스타일' })
export class TitleStyleEntity implements TitleStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => Int, { description: '위쪽 마진', nullable: true })
  marginTop: number | null;

  @Field(() => Int, { description: '아래쪽 마진', nullable: true })
  marginBottom: number | null;

  @Field(() => Int, { description: '오른쪽 마진', nullable: true })
  marginRight: number | null;

  @Field(() => Int, { description: '왼쪽 마진', nullable: true })
  marginLeft: number | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
