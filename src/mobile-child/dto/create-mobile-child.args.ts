import { MobileChildEntity } from '@libs/entity';
import { Int, Field, PickType, ArgsType } from '@nestjs/graphql';
import { ChildType } from '@prisma/client';
import { IsEnum, IsInt } from 'class-validator';

@ArgsType()
export class CreateMobileChildArgs extends PickType(MobileChildEntity, [
  'componentId',
  'childType',
]) {
  @Field(() => Int, { description: '컴포넌트 ID' })
  @IsInt({ message: '올바른 형식의 컴포넌트 ID를 입력해주세요.' })
  componentId: number;

  @Field(() => ChildType, { description: '컴포넌트 종류' })
  @IsEnum(ChildType, {
    message: '올바른 형식의 컴포넌트 종류를 입력해주세요.',
  })
  childType: ChildType;
}
