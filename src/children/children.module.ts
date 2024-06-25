import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenResolver } from './children.resolver';
import { FileModule } from '@libs/file';

@Module({
  imports: [FileModule],
  providers: [ChildrenResolver, ChildrenService],
  exports: [ChildrenService],
})
export class ChildrenModule {}
