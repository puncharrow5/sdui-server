import { ContentStyleEntity } from '@libs/entity';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ContentStyleInput extends PickType(ContentStyleEntity, [
  'margin',
  'mobileMargin',
  'size',
  'mobileSize',
  'lineHeight',
  'mobileLineHeight',
  'color',
]) {
  @Field({ description: '마진', nullable: true })
  @IsString({ message: '올바른 형식의 마진을 입력해주세요.' })
  @IsOptional()
  margin: string | null;

  @Field({ description: '모바일 마진', nullable: true })
  @IsString({ message: '올바른 형식의 모바일 마진을 입력해주세요.' })
  @IsOptional()
  mobileMargin: string | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  @IsInt({ message: '올바른 형식의 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  size: number | null;

  @Field(() => Int, { description: '모바일 텍스트 크기', nullable: true })
  @IsInt({ message: '올바른 형식의 모바일 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  mobileSize: number | null;

  @Field(() => Int, { description: '줄 높이', nullable: true })
  @IsInt({ message: '올바른 형식의 줄 높이를 입력해주세요.' })
  @IsOptional()
  lineHeight: number | null;

  @Field(() => Int, { description: '모바일 줄 높이', nullable: true })
  @IsInt({ message: '올바른 형식의 모바일 줄 높이를 입력해주세요.' })
  @IsOptional()
  mobileLineHeight: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  color: string | null;
}
