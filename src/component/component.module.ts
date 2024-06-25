import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';
import { StyleModule } from 'src/style/style.module';
import { ChildrenModule } from 'src/children/children.module';

@Module({
  imports: [StyleModule, ChildrenModule],
  providers: [ComponentResolver, ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
