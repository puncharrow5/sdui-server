import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FooterService } from './footer.service';
import { UpdateFooterArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { AdminUpdateAccessGuard } from '@libs/guard';

@Resolver()
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}

  @UseGuards(AdminUpdateAccessGuard)
  @Mutation(() => Boolean, { description: '푸터 수정' })
  updateFooter(@Args() updateFooterArgs: UpdateFooterArgs) {
    return this.footerService.updateFooter(updateFooterArgs);
  }
}
