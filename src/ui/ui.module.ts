import { Module } from '@nestjs/common';
import { UiService } from './ui.service';
import { UiResolver } from './ui.resolver';

@Module({
  providers: [UiResolver, UiService],
})
export class UiModule {}
