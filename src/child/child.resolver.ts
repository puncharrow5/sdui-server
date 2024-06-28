import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChildService } from './child.service';
import { CreateChildArgs, DeleteChildArgs, UpdateChildArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';
import { ChildEntity, ChildStyleEntity } from '@libs/entity';
import { StyleService } from 'src/style/style.service';

@Resolver(() => ChildEntity)
export class ChildResolver {
  constructor(
    private readonly childService: ChildService,
    private readonly styleService: StyleService,
  ) {}

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 생성' })
  createChild(@Args() createComponentArgs: CreateChildArgs) {
    return this.childService.createChild(createComponentArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 업데이트' })
  updateChild(@Args() updateChildArgs: UpdateChildArgs) {
    return this.childService.updateChild(updateChildArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '자식 컴포넌트 삭제' })
  deleteChild(@Args() deleteChildArgs: DeleteChildArgs) {
    return this.childService.deleteChild(deleteChildArgs);
  }

  @ResolveField('childStyle', () => ChildStyleEntity, {
    description: '자식 컴포넌트 스타일',
    nullable: true,
  })
  childStyle(@Parent() child: ChildEntity) {
    const { id } = child;

    return this.styleService.findChildStyle(id);
  }
}
