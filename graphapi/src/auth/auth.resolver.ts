import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginInput, LoginResponse } from './models/auth.model';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => LoginResponse)
    async login(@Args('loginInput') login: LoginInput): Promise<LoginResponse>{
        const user = await this.authService.validateUser(login.email, login.password)
        if (!user){
            throw new UnauthorizedException();
        }
        return user
    }
}
