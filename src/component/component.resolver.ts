import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from './component.service';
import { ComponentEntity } from 'libs/entity/src';
import { AddComponentArgs } from './dto';

@Resolver(() => ComponentEntity)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation(() => Boolean, { description: '컴포넌트 추가' })
  addComponent(@Args() addComponentArgs: AddComponentArgs) {
    return this.componentService.addComponent(addComponentArgs);
  }
}
