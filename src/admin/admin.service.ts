import { Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';

@Injectable()
export class AdminService {
  create(createAdminInput: CreateAdminInput) {
    return 'This action adds a new admin';
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }
}
