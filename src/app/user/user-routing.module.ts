import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';

const USER_ROUTES: Route[] = [
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
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
