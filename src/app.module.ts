import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ComponentModule } from './component/component.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { SiteModule } from './site/site.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from '@libs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
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
