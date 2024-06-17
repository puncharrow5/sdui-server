import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UiService } from './ui.service';
import { Ui } from './entities/ui.entity';
import { CreateUiInput } from './dto/create-ui.input';
import { UpdateUiInput } from './dto/update-ui.input';

@Resolver(() => Ui)
export class UiResolver {
  constructor(private readonly uiService: UiService) {}

  @Mutation(() => Ui)
  createUi(@Args('createUiInput') createUiInput: CreateUiInput) {
    return this.uiService.create(createUiInput);
  }

  @Query(() => [Ui], { name: 'ui' })
  findAll() {
    return this.uiService.findAll();
  }

  @Query(() => Ui, { name: 'ui' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.uiService.findOne(id);
  }

  @Mutation(() => Ui)
  updateUi(@Args('updateUiInput') updateUiInput: UpdateUiInput) {
    return this.uiService.update(updateUiInput.id, updateUiInput);
  }

  @Mutation(() => Ui)
  removeUi(@Args('id', { type: () => Int }) id: number) {
    return this.uiService.remove(id);
  }
}
