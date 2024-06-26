import { ContentStyleEntity } from '@libs/entity';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ContentStyleInput extends PickType(ContentStyleEntity, [
  'margin',
  'textSize',
  'textColor',
  'lineHeight',
]) {
  @Field({ description: '마진', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  margin: string | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  @IsInt({ message: '올바른 형식의 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  textColor: string | null;

  @Field(() => Int, { description: '줄 높이', nullable: true })
  @IsInt({ message: '올바른 형식의 줄 높이를 입력해주세요.' })
  @IsOptional()
  lineHeight: number | null;
}
