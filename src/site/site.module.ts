import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteResolver } from './site.resolver';
import { ComponentModule } from 'src/component/component.module';
import { HeaderModule } from 'src/header/header.module';

@Module({
  imports: [ComponentModule, HeaderModule],
  providers: [SiteResolver, SiteService],
})
export class SiteModule {}
