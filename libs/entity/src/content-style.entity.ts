import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContentStyle } from '@prisma/client';

@ObjectType({ description: '내용 스타일' })
export class ContentStyleEntity implements ContentStyle {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '마진', nullable: true })
  margin: string | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  textColor: string | null;

  @Field(() => Int, { description: '줄 높이', nullable: true })
  lineHeight: number;

  @Field(() => Int, { description: '컴포넌트 ID' })
  componentId: number;
}
