import { AdminEntity } from '@libs/entity';

export class AuthModel implements AdminEntity {
  id: number;
  email: string;
  password: string;
}
