import { ContentStyleEntity } from '@libs/entity';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class ContentStyleInput extends PickType(ContentStyleEntity, [
  'marginTop',
  'marginBottom',
  'marginRight',
  'marginLeft',
  'textSize',
  'textColor',
]) {
  @Field(() => Int, { description: '위쪽 마진', nullable: true })
  @IsInt({ message: '올바른 형식의 위쪽 마진을 입력해주세요.' })
  @IsOptional()
  marginTop: number | null;

  @Field(() => Int, { description: '아래쪽 마진', nullable: true })
  @IsInt({ message: '올바른 형식의 아래쪽 마진을 입력해주세요.' })
  @IsOptional()
  marginBottom: number | null;

  @Field(() => Int, { description: '오른쪽 마진', nullable: true })
  @IsInt({ message: '올바른 형식의 오른쪽 마진을 입력해주세요.' })
  @IsOptional()
  marginRight: number | null;

  @Field(() => Int, { description: '왼쪽 마진', nullable: true })
  @IsInt({ message: '올바른 형식의 왼쪽 마진을 입력해주세요.' })
  @IsOptional()
  marginLeft: number | null;

  @Field(() => Int, { description: '텍스트 크기', nullable: true })
  @IsInt({ message: '올바른 형식의 텍스트 크기를 입력해주세요.' })
  @IsOptional()
  textSize: number | null;

  @Field({ description: '텍스트 색상', nullable: true })
  @IsString({ message: '' })
  @IsOptional()
  textColor: string | null;
}
