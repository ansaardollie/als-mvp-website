import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
