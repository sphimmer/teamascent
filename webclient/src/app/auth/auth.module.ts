import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
