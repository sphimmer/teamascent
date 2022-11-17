import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { LoginInput, LoginResponse } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginResponse> {
    const user = await this.usersService.findUserByEmail(email);
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      return this.login(user);
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id, organization: user.organization.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
