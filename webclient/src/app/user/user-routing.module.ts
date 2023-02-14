import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkService } from '../link.service';

const routes: Routes = [
  LinkService.getRouterConfig('teamspace'),
  LinkService.getRouterConfig('account')
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
