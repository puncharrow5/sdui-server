import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TitleStyleInput } from './title-style.input';
import { ContentStyleInput } from './content-style.input';
import { BackgroundType } from '@prisma/client';

@ArgsType()
export class UpdateComponentArgs extends PickType(ComponentEntity, [
  'id',
  'title',
  'content',
  'backgroundType',
  'background',
]) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  title: string | null;

  @Field({ description: '내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  content: string | null;

  @Field({ description: '배경', nullable: true })
  @IsString({ message: '올바른 형식의 배경을 입력해주세요.' })
  @IsOptional()
  background: string | null;

  @Field(() => BackgroundType, { description: '배경 종류', nullable: true })
  @IsEnum(BackgroundType, {
    message: '올바른 형식의 배경 종류를 입력해주세요.',
  })
  @IsOptional()
  backgroundType: BackgroundType | null;

  @Field(() => TitleStyleInput, { description: '제목 스타일', nullable: true })
  @ValidateNested({ each: true })
  @Type(() => TitleStyleInput)
  @IsOptional()
  titleStyle: TitleStyleInput | null;

  @Field(() => ContentStyleInput, {
    description: '내용 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ContentStyleInput)
  @IsOptional()
  contentStyle: ContentStyleInput | null;
}
