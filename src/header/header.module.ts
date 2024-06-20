import { Module } from '@nestjs/common';
import { HeaderService } from './header.service';
import { HeaderResolver } from './header.resolver';
import { FileModule } from '@libs/file';

@Module({
  imports: [FileModule],
  providers: [HeaderResolver, HeaderService],
  exports: [HeaderService],
})
export class HeaderModule {}
