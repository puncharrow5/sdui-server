import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FooterService } from './footer.service';
import { UpdateFooterArgs } from './dto';

@Resolver()
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}

  @Mutation(() => Boolean, { description: '푸터 설정' })
  updateFooter(@Args() updateFooterArgs: UpdateFooterArgs) {
    return this.footerService.updateFooter(updateFooterArgs);
  }
}
