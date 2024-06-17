import { CreateUiInput } from './create-ui.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUiInput extends PartialType(CreateUiInput) {
  @Field(() => Int)
  id: number;
}
