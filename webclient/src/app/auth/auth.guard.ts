import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LinkService } from '../link.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService, private linkService: LinkService) {}

  async setUserIfLoggedIn() {
    console.log('setting user');
    const token = this.authService.getToken();
    if (token) {
      console.log("getting user from api")
      this.authService
        .getUser()
        .valueChanges.subscribe({
          next: (result) => {
            const me = result.data.me;
            console.log('is logged in', me);
            this.authService.setUser({
              firstName: me.firstName,
              lastName: me.lastName,
              email: me.email,
              id: me.id,
              role: '',
              password: '',
            });
            // this.router.navigate([this.linkService.getLink('skills')])
          },
          error: (err) => {
            console.log(err);
          },
        })
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }

  async checkLogin(url: string): Promise<boolean | UrlTree> {
    if (this.authService.user) {
      return true;
    }
    this.authService.redirectUrl = url;

    return this.router.navigate([this.linkService.getLink('login')]);
  }
}
