import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { IUser } from 'src/interfaces/IUser';
import { USERS } from './mock-users';
import { Apollo, gql, MutationResult, QueryRef } from 'apollo-angular';
import { MeResult } from 'src/interfaces/Me';
import { meQuery } from '../graphql/me';

interface loginResult {
      login: {
        access_token: string,
        user: IUser
      }
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private apollo: Apollo) {}
  redirectUrl: string | null = null;
  user?: IUser;
  accessToken?: string;

  setUser(user: IUser){
    this.user = user
    console.log("user set in service")
  }

  setToken(token: string): void {
    localStorage.setItem("access_token", token);
    this.accessToken = token;
  }

  getToken(): string | null{
    if (this.accessToken) {
      return this.accessToken
    } else {
      console.log("getting token from local stoage")
      const token = localStorage.getItem("access_token")
      if (token){
        console.log("token found")
        this.accessToken = token
        return token
      } else {
        console.log("token not found")
        return null
      }
    }
  }


  login(email: string, password: string): Observable<MutationResult<loginResult>>{
    const login = gql`
      mutation Login($email: String!, $password: String!){
        login(loginInput:{email: $email, password: $password}) {
          access_token
          user{
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
    })
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

  getUser(): QueryRef<MeResult>{
    return this.apollo.watchQuery<MeResult>({
      query: meQuery
    })
  }
}
