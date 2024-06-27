import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildResolver } from './child.resolver';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  providers: [ChildResolver, ChildService],
  exports: [ChildService],
})
export class ChildModule {}
