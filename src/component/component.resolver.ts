import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ComponentService } from './component.service';
import {
  ChildrenEntity,
  ComponentEntity,
  ContentStyleEntity,
  TitleStyleEntity,
} from '@libs/entity';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { StyleService } from 'src/style/style.service';
import { ChildrenService } from 'src/children/children.service';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';

@Resolver(() => ComponentEntity)
export class ComponentResolver {
  constructor(
    private readonly componentService: ComponentService,
    private readonly styleService: StyleService,
    private readonly childrenService: ChildrenService,
  ) {}

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 생성' })
  createComponent(@Args() createComponentArgs: CreateComponentArgs) {
    return this.componentService.createComponent(createComponentArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 수정' })
  updateComponent(@Args() updateComponentArgs: UpdateComponentArgs) {
    return this.componentService.updateComponent(updateComponentArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 삭제' })
  deleteComponent(@Args() deleteComponentArgs: DeleteComponentArgs) {
    return this.componentService.deleteComponent(deleteComponentArgs);
  }

  @ResolveField('titleStyle', () => TitleStyleEntity, {
    description: '제목 스타일',
    nullable: true,
  })
  titleStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findTitleStyle(id);
  }

  @ResolveField('contentStyle', () => ContentStyleEntity, {
    description: '내용 스타일',
    nullable: true,
  })
  contentStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findContentStyle(id);
  }

  @ResolveField('children', () => [ChildrenEntity], {
    description: '자식 컴포넌트 목록',
    nullable: true,
  })
  children(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.childrenService.findManyChildren(id);
  }
}
