import { Component, Injectable, Input, OnInit } from '@angular/core';
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
      this.authService.login(this.email, this.password).subscribe({
        next: (result) => {
          if (result.data) {
            console.log(result.data);
            this.authService.setUser(result.data.login.user)
            this.authService.setToken(result.data.login.access_token)
            this.router.navigate([this.linkService.getLink('skills')])
          }
        },
        error: (error) => {
          this.message = "Ther was an error logging in. Check your username and password."
        }
      });
    } else {
      this.message = "Please provide email and password"
    }
  }
}
