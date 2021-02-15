import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OrderFormPageComponent } from './order-form-page/order-form-page.component';
import { WholesaleLandingComponent } from './wholesale-landing/wholesale-landing.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: WholesaleLandingComponent,
  },
  {
    path: 'order',
    component: OrderFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholesaleRoutingModule {}
