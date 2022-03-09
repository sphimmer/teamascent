import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkService } from './link.service';



const routes: Routes = [
  LinkService.getRouterConfig('home'),
  LinkService.getRouterConfig('pricing'),
  LinkService.getRouterConfig('contact'),

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
