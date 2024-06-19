import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';
import { StyleModule } from 'src/style/style.module';

@Module({
  imports: [StyleModule],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
