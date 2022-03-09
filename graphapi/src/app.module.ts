import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import { UserToSkillModule } from './UserToSkill/userToSkill.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    SkillsModule,
    UsersModule,
    UserToSkillModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
          path: error?.path,
          locations: error?.locations,
          extensions: {
            code: error?.extensions?.code,
          },
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class AppModule {}
