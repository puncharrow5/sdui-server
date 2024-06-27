import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChildService } from './child.service';
import { CreateChildArgs, DeleteChildArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';

@Resolver()
export class ChildResolver {
  constructor(private readonly childService: ChildService) {}

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 생성' })
  createChild(@Args() createComponentArgs: CreateChildArgs) {
    return this.childService.createChild(createComponentArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 삭제' })
  deleteChild(@Args() deleteChildArgs: DeleteChildArgs) {
    return this.childService.deleteChild(deleteChildArgs);
  }
}
