import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ComponentModule } from './component/component.module';

@Module({
  imports: [AdminModule, ComponentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
