import { MobileChildStyleEntity } from '@libs/entity';
import { Field, InputType, PickType } from '@nestjs/graphql';
import { BackgroundType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class MobileChildStyleInput extends PickType(MobileChildStyleEntity, [
  'width',
  'height',
  'margin',
  'padding',
  'background',
  'backgroundType',
  'border',
  'borderRadius',
]) {
  @Field({ description: '너비', nullable: true })
  @IsString({ message: '올바른 형식의 너비를 입력해주세요.' })
  @IsOptional()
  width: string | null;

  @Field({ description: '높이', nullable: true })
  @IsString({ message: '올바른 형식의 높이를 입력해주세요.' })
  @IsOptional()
  height: string | null;

  @Field({ description: '마진', nullable: true })
  @IsString({ message: '올바른 형식의 마진을 입력해주세요.' })
  @IsOptional()
  margin: string | null;

  @Field({ description: '패딩', nullable: true })
  @IsString({ message: '올바른 형식의 패딩을 입력해주세요.' })
  @IsOptional()
  padding: string | null;

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

  @Field({ description: '테두리', nullable: true })
  @IsString({ message: '올바른 형식의 테두리을 입력해주세요.' })
  @IsOptional()
  border: string | null;

  @Field({ description: '테두리 곡률', nullable: true })
  @IsString({ message: '올바른 형식의 테두리 곡률을 입력해주세요.' })
  @IsOptional()
  borderRadius: string | null;
}
