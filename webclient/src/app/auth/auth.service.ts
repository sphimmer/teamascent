import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { IUser } from 'src/interfaces/IUser';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  redirectUrl: string | null = null
  user?: IUser = USERS[0]

  login(email: string, password: string): Observable<IUser>{

    const user = USERS.filter(user => user.email == email && user.password == password)
    if(user.length == 1) {
      this.user = user[0]
      this.user.jwt = "SIGNED IN"
      return of(user[0])
    } else {
      throw new Error("Invalid login credentials")
    }
  }

  signup(user: IUser): Observable<IUser>{
    const existingUser = USERS.filter(u => u.email == user.email)
    if (existingUser.length > 0) {
      throw new Error("email already in use, please sign in")
    }
    user.jwt = "SIGNED IN"
    USERS.push(user)
    this.user = user
    return of(this.user)
  }

  logout(){
    this.user = undefined
  }

  getUser(id: number): Observable<IUser>{
    const user = USERS.filter(u => u.id == id)
    if(user.length == 1) {
      return of(user[0])
    } else {
      throw new Error("User not found")
    }
  }
}
