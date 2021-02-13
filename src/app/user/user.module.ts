import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
