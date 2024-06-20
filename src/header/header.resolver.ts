import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { UpdateHeaderArgs } from './dto';

@Resolver()
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @Mutation(() => Boolean, { description: '헤더 스타일 설정' })
  updateHeader(@Args() updateHeaderArgs: UpdateHeaderArgs) {
    return this.headerService.updateHeader(updateHeaderArgs);
  }
}
