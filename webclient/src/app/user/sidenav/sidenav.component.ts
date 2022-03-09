import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LinkService } from 'src/app/link.service';
declare function diagonalMovementAndSideNav4(): void;
declare function responsiveSidebar(): void;


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public linkService: LinkService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    diagonalMovementAndSideNav4()
    responsiveSidebar()
  }

  logout(){
    this.authService.logout();
    const link = this.linkService.getLink('login')
    if(link){
      this.router.navigateByUrl(link);
    }
  }
}
