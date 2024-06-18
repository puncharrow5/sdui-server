import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SiteService } from './site.service';
import { ComponentEntity, SiteEntity } from '@libs/entity';
import {
  CreateSiteArgs,
  FindOneSiteByDomainArgs,
  FindOneSiteByIdArgs,
} from './dto';
import { ComponentService } from 'src/component/component.service';
import { UseGuards } from '@nestjs/common';
import { AdminAccessGuard } from '@libs/guard';
import { AuthModel } from 'src/auth/auth.model';
import { CurrentAuth } from '@libs/decorator';

@Resolver(() => SiteEntity)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly componentService: ComponentService,
  ) {}

  @Query(() => SiteEntity, { description: 'ID로 사이트 조회' })
  findOneSiteById(@Args() findOneSiteByIdArgs: FindOneSiteByIdArgs) {
    return this.siteService.findOneSiteById(findOneSiteByIdArgs);
  }

  @Query(() => SiteEntity, { description: '도메인으로 사이트 조회' })
  findOneSiteByDomain(
    @Args() findOneSiteByDomainArgs: FindOneSiteByDomainArgs,
  ) {
    return this.siteService.findOneSiteByDomain(findOneSiteByDomainArgs);
  }

  @UseGuards(AdminAccessGuard)
  @Mutation(() => Boolean, { description: '사이트 생성' })
  createSite(
    @Args() createSiteArgs: CreateSiteArgs,
    @CurrentAuth() auth: AuthModel,
  ) {
    const adminId = auth.id;

    return this.siteService.createSite(createSiteArgs, adminId);
  }

  @ResolveField('components', () => [ComponentEntity], {
    description: '컴포넌트 목록',
  })
  components(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.componentService.findManyComponent(id);
  }
}
