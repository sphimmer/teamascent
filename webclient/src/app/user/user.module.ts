import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { SkillsComponent } from './skills/skills.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchPersonComponent } from './search-person/search-person.component';
import { BuilderComponent } from './builder/builder.component';





@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    UserComponent,
    ProfileNavComponent,
    SkillsComponent,
    SidenavComponent,
    SearchPersonComponent,
    BuilderComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AppRoutingModule,
  ]
})
export class UserModule { }
