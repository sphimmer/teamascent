import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from '@angular/common';
import { LinkService } from 'src/app/link.service';


declare function flexiHeader(): void;
declare function animatedMenuButton(): void;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, public location: Location, public linkService: LinkService) {}


  ngOnInit(): void {
    flexiHeader();
    animatedMenuButton();
  }



  logout() {
    this.authService.logout();
    const link = this.linkService.getLink('login')
    if(link){
      this.router.navigateByUrl(link);
    }
  }
}
