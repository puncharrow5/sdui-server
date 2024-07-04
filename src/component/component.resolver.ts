import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ComponentService } from './component.service';
import {
  ChildEntity,
  ComponentEntity,
  ComponentMobileStyleEntity,
  ComponentStyleEntity,
  ContentStyleEntity,
  MobileChildEntity,
  TitleStyleEntity,
} from '@libs/entity';
import {
  CreateComponentArgs,
  DeleteComponentArgs,
  UpdateComponentArgs,
} from './dto';
import { StyleService } from 'src/style/style.service';
import { ChildService } from 'src/child/child.service';
import { MobileChildService } from 'src/mobile-child/mobile-child.service';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';

@Resolver(() => ComponentEntity)
export class ComponentResolver {
  constructor(
    private readonly componentService: ComponentService,
    private readonly styleService: StyleService,
    private readonly childService: ChildService,
    private readonly mobileChildService: MobileChildService,
  ) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 생성' })
  createComponent(@Args() createComponentArgs: CreateComponentArgs) {
    return this.componentService.createComponent(createComponentArgs);
  }

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '컴포넌트 수정' })
  updateComponent(@Args() updateComponentArgs: UpdateComponentArgs) {
    return this.componentService.updateComponent(updateComponentArgs);
  }

  @UseGuards(AdminUpdateAccessGuard)
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

  @ResolveField('componentStyle', () => ComponentStyleEntity, {
    description: '컴포넌트 스타일',
    nullable: true,
  })
  componentStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findComponentStyle(id);
  }

  @ResolveField('componentMobileStyle', () => ComponentMobileStyleEntity, {
    description: '컴포넌트 모바일 스타일',
    nullable: true,
  })
  componentMobileStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findComponentMobileStyle(id);
  }

  @ResolveField('contentStyle', () => ContentStyleEntity, {
    description: '내용 스타일',
    nullable: true,
  })
  contentStyle(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.styleService.findContentStyle(id);
  }

  @ResolveField('children', () => [ChildEntity], {
    description: '자식 컴포넌트 목록',
    nullable: true,
  })
  children(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.childService.findManyChild(id);
  }

  @ResolveField('mobileChildren', () => [MobileChildEntity], {
    description: '모바일 자식 컴포넌트 목록',
    nullable: true,
  })
  mobileChildren(@Parent() component: ComponentEntity) {
    const { id } = component;

    return this.mobileChildService.findManyMobileChild(id);
  }
}
