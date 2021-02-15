import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';

import { SharedModule } from './../shared/shared.module';
import { OrderFormProductComponent } from './order-form-product/order-form-product.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { WholesaleLandingComponent } from './wholesale-landing/wholesale-landing.component';
import { WholesaleRoutingModule } from './wholesale-routing.module';
import { OrderFormPageComponent } from './order-form-page/order-form-page.component';

@NgModule({
  declarations: [
    WholesaleLandingComponent,
    OrderFormComponent,
    OrderFormProductComponent,
    OrderFormPageComponent,
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    SharedModule,
    WholesaleRoutingModule,
  ],
})
export class WholesaleModule {}
