import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { IUser } from 'src/interfaces/IUser';
import { USERS } from './mock-users';
import { Apollo, gql } from 'apollo-angular';

interface loginResult {

    data: {
      login: {
        access_token: string,
        user: IUser
      }
    }

}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apollo: Apollo) {}
  redirectUrl: string | null = null;
  user?: IUser = USERS[0];

  login(email: string, password: string) {
    const login = gql`
      mutation Login($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
          access_token
          user {
            email
            lastName
            firstName
            id
          }
        }
      }
    `;
    return this.apollo.mutate<loginResult>({
      mutation: login,
      variables: {
        email: email,
        password: password
      }
    });

  }

  signup(user: IUser): Observable<IUser> {
    const existingUser = USERS.filter((u) => u.email == user.email);
    if (existingUser.length > 0) {
      throw new Error('email already in use, please sign in');
    }
    user.jwt = 'SIGNED IN';
    USERS.push(user);
    this.user = user;
    return of(this.user);
  }

  logout() {
    this.user = undefined;
  }

  getUser(id: number): Observable<IUser> {
    const user = USERS.filter((u) => u.id == id);
    if (user.length == 1) {
      return of(user[0]);
    } else {
      throw new Error('User not found');
    }
  }
}
