import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminEntity } from 'libs/entity/src';
import { CreateAdminArgs } from './dto';

@Resolver(() => AdminEntity)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => AdminEntity, { description: '회원가입' })
  createAdmin(@Args() createAdminArgs: CreateAdminArgs) {
    return this.adminService.createAdmin(createAdminArgs);
  }

  @Query(() => AdminEntity, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }
}
