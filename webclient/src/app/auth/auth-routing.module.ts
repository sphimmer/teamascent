import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkService } from '../link.service';


const routes: Routes = [
  LinkService.getRouterConfig('auth'),
  // LinkService.getRouterConfig('signup'),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
