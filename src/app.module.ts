import { Logger, Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ComponentModule } from './component/component.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    }),
    AdminModule,
    ComponentModule,
    SiteModule,
  ],
  controllers: [],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}
