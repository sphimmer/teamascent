import { Query, Res, UnauthorizedException} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { LoginInput, LoginResponse } from './models/auth.model';
import { Response as ResponseType } from 'express';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => LoginResponse)
    async login(@Args('loginInput') login: LoginInput, @Context() context): Promise<LoginResponse>{
        const response = await this.authService.validateUser(login.email, login.password)
        if (!response){
            throw new UnauthorizedException();
        }
        return response
    }
}
