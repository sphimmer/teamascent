import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from 'src/app/link.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() email?: string
  @Input() password?: string
  message?: string

  constructor(private authService: AuthService, private router: Router, public linkService: LinkService) { }

  ngOnInit(): void {
  }

  login(){
    this.message = undefined
    if(this.email && this.password){
      try {
        this.authService.login(this.email, this.password).subscribe(user => {
          this.router.navigate([this.linkService.getLink('skills')])
        })
      } catch (error) {
        this.message = error as string
      }

    } else {
      this.message = "Please provide email and password"
    }

  }

}
