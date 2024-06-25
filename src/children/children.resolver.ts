import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChildrenService } from './children.service';
import { CreateChildrenArgs } from './dto';

@Resolver()
export class ChildrenResolver {
  constructor(private readonly childrenService: ChildrenService) {}

  @Mutation(() => Boolean, { description: '자식 컴포넌트 생성' })
  createChildren(@Args() createComponentArgs: CreateChildrenArgs) {
    return this.childrenService.createChildren(createComponentArgs);
  }
}
