import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Admin } from '@prisma/client';

@ObjectType({ description: '관리자' })
export class AdminEntity implements Admin {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: '이메일' })
  email: string;

  @Field({ description: '비밀번호' })
  password: string;
}
