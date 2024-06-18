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

@Resolver()
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly componentService: ComponentService,
  ) {}

  @Query(() => SiteEntity, { name: 'ID로 사이트 조회' })
  findOneSiteById(@Args() findOneSiteByIdArgs: FindOneSiteByIdArgs) {
    return this.siteService.findOneSiteById(findOneSiteByIdArgs);
  }

  @Query(() => SiteEntity, { name: '도메인으로 사이트 조회' })
  findOneSiteByDomain(
    @Args() findOneSiteByDomainArgs: FindOneSiteByDomainArgs,
  ) {
    return this.siteService.findOneSiteByDomain(findOneSiteByDomainArgs);
  }

  @Mutation(() => Boolean, { description: '사이트 생성' })
  createSite(@Args() createSiteArgs: CreateSiteArgs) {
    return this.siteService.createSite(createSiteArgs);
  }

  @ResolveField('components', () => [ComponentEntity], {
    description: '컴포넌트 목록',
  })
  components(@Parent() site: SiteEntity) {
    const { id } = site;

    return this.componentService.findManyComponent(id);
  }
}
