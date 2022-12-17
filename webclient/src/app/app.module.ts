import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { HomepageComponent } from './homepage/homepage.component';
import { PricingpageComponent } from './pricingpage/pricingpage.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PricingpageComponent,
    ContactpageComponent,
    NotfoundpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserModule,
    AuthModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
