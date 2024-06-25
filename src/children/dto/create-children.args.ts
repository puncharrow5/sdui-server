import { ChildrenEntity } from '@libs/entity';
import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class CreateChildrenArgs extends PickType(ChildrenEntity, [
  'componentId',
  'name',
  'image',
  'width',
  'height',
  'margin',
]) {
  @Field(() => Int, { description: '컴포넌트 ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  componentId: number;

  @Field({ description: '이름' })
  @IsString({ message: '올바른 형식의 이름을 입력해주세요.' })
  name: string;

  @Field({ description: 'image', nullable: true })
  @IsString({ message: '올바른 형식의 이미지를 입력해주세요.' })
  @IsOptional()
  image: string | null;

  @Field({ description: '너비', nullable: true })
  @IsString({ message: '올바른 형식의 너비를 입력해주세요.' })
  @IsOptional()
  width: string | null;

  @Field({ description: '높이', nullable: true })
  @IsString({ message: '올바른 형식의 높이를 입력해주세요.' })
  @IsOptional()
  height: string | null;

  @Field({ description: '마진', nullable: true })
  @IsString({ message: '올바른 형식의 마진를 입력해주세요.' })
  @IsOptional()
  margin: string | null;
}
