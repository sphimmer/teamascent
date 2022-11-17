import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import { UserToSkillModule } from './userToSkill/userToSkill.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { RolesModule } from './roles/roles.module';
import { TeamsModule } from './teams/teams.module';
import { PositionsModule } from './positions/postions.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SkillsModule,
    UsersModule,
    UserToSkillModule,
    RolesModule,
    TeamsModule,
    PositionsModule,
    OrganizationsModule,
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
    AuthModule,
  ],
})
export class AppModule {}
