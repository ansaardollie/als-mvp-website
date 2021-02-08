import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ShopComponent } from './shop.component';

const routes: Route[] = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ProductCatalogueComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
