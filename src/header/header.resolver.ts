import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { SetHeaderStyleArgs } from './dto';

@Resolver()
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @Mutation(() => Boolean, { description: '헤더 스타일 설정' })
  setHeaderStyle(@Args() setHeaderStyleArgs: SetHeaderStyleArgs) {
    return this.headerService.setHeaderStyle(setHeaderStyleArgs);
  }
}
