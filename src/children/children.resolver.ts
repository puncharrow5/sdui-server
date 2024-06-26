import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChildrenService } from './children.service';
import { CreateChildrenArgs, DeleteChildrenArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';

@Resolver()
export class ChildrenResolver {
  constructor(private readonly childrenService: ChildrenService) {}

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 생성' })
  createChildren(@Args() createComponentArgs: CreateChildrenArgs) {
    return this.childrenService.createChildren(createComponentArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 삭제' })
  deleteChildren(@Args() deleteChildrenArgs: DeleteChildrenArgs) {
    return this.childrenService.deleteChildren(deleteChildrenArgs);
  }
}
