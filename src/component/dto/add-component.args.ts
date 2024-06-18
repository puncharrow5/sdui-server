import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ComponentEntity } from '@libs/entity';
import { ComponentType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class AddComponentArgs extends PickType(ComponentEntity, [
  'siteId',
  'componentType',
  'name',
  'title',
  'titleStyle',
  'content',
  'contentStyle',
  'background',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;

  @Field(() => ComponentType, { description: '컴포넌트 종류' })
  @IsEnum(ComponentType, {
    message: '올바른 형식의 컴포넌트 종류를 입력해주세요.',
  })
  componentType: ComponentType;

  @Field({ description: '컴포넌트 이름' })
  @IsString({ message: '올바른 형식의 컴포넌트 이름을 입력해주세요.' })
  name: string;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목을 입력해주세요.' })
  @IsOptional()
  title: string | null;

  @Field({ description: '제목', nullable: true })
  @IsString({ message: '올바른 형식의 제목 스타일을 입력해주세요.' })
  @IsOptional()
  titleStyle: string | null;

  @Field({ description: '내용', nullable: true })
  @IsString({ message: '올바른 형식의 내용을 입력해주세요.' })
  @IsOptional()
  content: string | null;

  @Field({ description: '내용 스타일', nullable: true })
  @IsString({ message: '올바른 형식의 내용 스타일을 입력해주세요.' })
  @IsOptional()
  contentStyle: string | null;

  @Field({ description: '배경', nullable: true })
  @IsString({ message: '올바른 형식의 배경을 입력해주세요.' })
  @IsOptional()
  background: string | null;
}
