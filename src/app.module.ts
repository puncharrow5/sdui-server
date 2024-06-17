import { Logger, Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ComponentModule } from './component/component.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleWare'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    AdminModule,
    ComponentModule,
    SiteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
