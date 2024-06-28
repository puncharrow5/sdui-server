import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HeaderService } from './header.service';
import { UpdateHeaderArgs, UpdateMobileHeaderArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';

@Resolver()
export class HeaderResolver {
  constructor(private readonly headerService: HeaderService) {}

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '헤더 설정' })
  updateHeader(@Args() updateHeaderArgs: UpdateHeaderArgs) {
    return this.headerService.updateHeader(updateHeaderArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '모바일 헤더 설정' })
  updateMobileHeader(@Args() updateMobileHeaderArgs: UpdateMobileHeaderArgs) {
    return this.headerService.updateMobileHeader(updateMobileHeaderArgs);
  }
}
