import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminEntity } from '@libs/entity';
import { CreateAdminArgs, LoginWithEmailArgs } from './dto';

@Resolver(() => AdminEntity)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => AdminEntity, { description: '회원가입' })
  createAdmin(@Args() createAdminArgs: CreateAdminArgs) {
    return this.adminService.createAdmin(createAdminArgs);
  }

  @Mutation(() => Boolean, { description: '로그인' })
  async login(
    @Args() loginWithEmailArgs: LoginWithEmailArgs,
    @Context() { res },
  ) {
    return await this.adminService.loginWithEmail(loginWithEmailArgs, res);
  }

  @Query(() => AdminEntity, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }
}
