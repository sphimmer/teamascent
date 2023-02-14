import { Type } from "@angular/core";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { ContactpageComponent } from "./contactpage/contactpage.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { PricingpageComponent } from "./pricingpage/pricingpage.component";
import { BuilderComponent } from "./user/builder/builder.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { SearchPersonComponent } from "./user/search-person/search-person.component";
import { SkillsComponent } from "./user/skills/skills.component";
import { UserComponent } from "./user/user/user.component";


export interface map<T> {
  [key: string]: T;
}


export interface Page {
  path: string
  children?: map<Page>
  canActivate?: any[]
  component?: Type<any>
}

export const SiteMap: map<Page> = {
  home: {
    path: "",
    component: HomepageComponent
  },
  pricing: {
    path: "pricing",
    component: PricingpageComponent
  },
  contact: {
    path: "contact",
    component: ContactpageComponent
  },
  account: {
    path: "account",
    canActivate: [AuthGuard],
    component: UserComponent,
    children: {
      profile: {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      skills: {
        path: 'skills',
        component: SkillsComponent,
        canActivate: [AuthGuard]
      },
    }
  },
  teamspace: {
    path: "teamspace",
    canActivate: [AuthGuard],
    component: UserComponent,
    children: {
      builder: {
        path: 'builder',
        component: BuilderComponent,
        canActivate: [AuthGuard]
      },
      people: {
        path: 'people',
        component: SearchPersonComponent,
        canActivate: [AuthGuard]
      }
    }
  },
  auth :{
    path: "auth",
    children : {
      login: {path: 'login', component: LoginComponent},
      signup: {path: 'signup', component: SignUpComponent}
    }
  },

}
