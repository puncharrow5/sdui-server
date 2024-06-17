import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUiInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
