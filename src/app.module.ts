import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UiModule } from './ui/ui.module';

@Module({
  imports: [UiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
