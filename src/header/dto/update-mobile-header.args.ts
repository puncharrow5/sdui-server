import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { MobileHeaderEntity } from '@libs/entity';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class UpdateMobileHeaderArgs extends PickType(MobileHeaderEntity, [
  'siteId',
  'logoSize',
  'buttonSize',
  'height',
  'paddingHorizontal',
  'paddingVertical',
  'backgroundColor',
  'textSize',
  'textColor',
  'border',
]) {
  @Field(() => Int, { description: '사이트 ID' })
  @IsInt({ message: '올바른 형식의 사이트 ID를 입력해주세요.' })
  siteId: number;

  @Field({ description: '로고 사이즈', nullable: true })
  @IsString({ message: '올바른 형식의 로고 사이즈를 입력해주세요.' })
  @IsOptional()
  logoSize: string | null;

  @Field({ description: '버튼 사이즈', nullable: true })
  @IsString({ message: '올바른 형식의 버튼 사이즈를 입력해주세요.' })
  @IsOptional()
  buttonSize: string | null;

  @Field(() => Int, { description: '헤더 높이', nullable: true })
  @IsInt({ message: '올바른 형식의 헤더 높이를 입력해주세요.' })
  @IsOptional()
  height: number | null;

  @Field({ description: '가로 패딩', nullable: true })
  @IsString({ message: '올바른 형식의 가로 패딩을 입력해주세요.' })
  @IsOptional()
  paddingHorizontal: string | null;

  @Field({ description: '세로 패딩', nullable: true })
  @IsString({ message: '올바른 형식의 세로 패딩을 입력해주세요.' })
  @IsOptional()
  paddingVertical: string | null;

  @Field({ description: '배경 색상', nullable: true })
  @IsString({ message: '올바른 형식의 배경 색상을 입력해주세요.' })
  @IsOptional()
  backgroundColor: string | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  @IsInt({ message: '올바른 형식의 텍스트 크기을 입력해주세요.' })
  @IsOptional()
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '올바른 형식의 텍스트 색상을 입력해주세요.' })
  @IsOptional()
  textColor: string | null;

  @Field({ description: '테두리', nullable: true })
  @IsString({ message: '올바른 형식의 테두리를 입력해주세요.' })
  @IsOptional()
  border: string | null;

  @Field(() => GraphQLUpload, {
    description: '로고 이미지 파일',
    nullable: true,
  })
  @IsOptional()
  logoFile: FileUpload | null;

  @Field(() => GraphQLUpload, {
    description: '버튼 이미지 파일',
    nullable: true,
  })
  @IsOptional()
  buttonFile: FileUpload | null;
}
