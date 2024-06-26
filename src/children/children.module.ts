import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenResolver } from './children.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [ChildrenResolver, ChildrenService],
  exports: [ChildrenService],
})
export class ChildrenModule {}
