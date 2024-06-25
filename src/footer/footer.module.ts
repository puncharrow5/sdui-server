import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterResolver } from './footer.resolver';
import { FileModule } from '@libs/file';

@Module({
  imports: [FileModule],
  providers: [FooterResolver, FooterService],
  exports: [FooterService],
})
export class FooterModule {}
