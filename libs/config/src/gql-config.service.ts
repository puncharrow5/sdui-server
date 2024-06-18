import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import {
  GraphQLError,
  NoSchemaIntrospectionCustomRule,
  ValidationRule,
} from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPlugin } from '@apollo/server';
import * as depthLimit from 'graphql-depth-limit';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    let csrfPrevention = true;

    const plugins: ApolloServerPlugin<any>[] = [];

    const validationRules: ValidationRule[] = [depthLimit(10)];

    const formatError = (error: GraphQLError) => {
      const graphQLFormattedError = {
        message: error.message,
        code: error.extensions['code'],
        status: error.extensions['status'],
      };

      return graphQLFormattedError;
    };

    if (this.configService.get('NODE_ENV') === 'production') {
      validationRules.push(NoSchemaIntrospectionCustomRule);
    } else {
      csrfPrevention = false;
      plugins.push(
        ApolloServerPluginLandingPageLocalDefault({
          footer: false,
          includeCookies: true,
        }),
      );
    }

    const context = (ctx) => {
      let cookies = undefined;
      if (ctx?.req?.cookies) {
        cookies = ctx.req.cookies;
      }
      if (ctx?.extra?.request?.headers?.cookie) {
        cookies = cookie.parse(ctx.extra.request.headers.cookie);
      }

      return {
        req: { ...ctx.req, cookies },
        res: ctx.res,
        payload: ctx.payload,
        connection: ctx.connection,
      };
    };

    return {
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: './schema.graphql',
      playground: false,
      fieldResolverEnhancers: ['guards'],
      installSubscriptionHandlers: true,
      context,
      csrfPrevention,
      plugins,
      validationRules,
      formatError,
    };
  }
}
