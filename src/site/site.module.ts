import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteResolver } from './site.resolver';
import { ComponentModule } from 'src/component/component.module';

@Module({
  imports: [ComponentModule],
  providers: [SiteResolver, SiteService],
})
export class SiteModule {}
