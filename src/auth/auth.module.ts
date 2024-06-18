import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AdminModule } from 'src/admin/admin.module';
import { AdminAccessStrategy } from './admin-access.strategy';

@Global()
@Module({
  imports: [AdminModule],
  providers: [AuthResolver, AuthService, AdminAccessStrategy],
})
export class AuthModule {}
