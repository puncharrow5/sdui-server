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
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ComponentStyleInput } from './component-style.input';

@ArgsType()
export class UpdateComponentArgs extends PickType(ComponentEntity, [
  'id',
  'name',
  'title',
  'content',
]) {
  @Field(() => Int, { description: 'ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  id: number;

  @Field({ description: '이름' })
  @IsString({ message: '올바른 형식의 이름을 입력해주세요.' })
  name: string;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  title: string | null;

  @Field({ description: '내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  content: string | null;

  @Field(() => ComponentStyleInput, {
    description: '컴포넌트 스타일',
    nullable: true,
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentStyleInput)
  @IsOptional()
  componentStyle: ComponentStyleInput | null;

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

  @Field(() => GraphQLUpload, {
    description: '첨부파일',
    nullable: true,
  })
  @IsOptional()
  file: FileUpload | null;
}
