import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ComponentService } from './component.service';
import {
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

@Resolver(() => ComponentEntity)
export class ComponentResolver {
  constructor(
    private readonly componentService: ComponentService,
    private readonly styleService: StyleService,
  ) {}

  @Mutation(() => Boolean, { description: '컴포넌트 생성' })
  createComponent(@Args() createComponentArgs: CreateComponentArgs) {
    return this.componentService.createComponent(createComponentArgs);
  }

  @Mutation(() => Boolean, { description: '컴포넌트 수정' })
  updateComponent(@Args() updateComponentArgs: UpdateComponentArgs) {
    return this.componentService.updateComponent(updateComponentArgs);
  }

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
}
