import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UiModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
