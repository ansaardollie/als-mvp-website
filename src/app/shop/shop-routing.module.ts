import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CategoryResolverService } from '../services/guards/category-resolver.service';
import { CategoryCatalogueComponent } from './category-catalogue/category-catalogue.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ShopComponent } from './shop.component';

const routes: Route[] = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'products',
        component: ProductCatalogueComponent,
      },
      {
        path: 'categories',
        redirectTo: 'categories/',
      },
      {
        path: 'categories/:id',
        component: CategoryCatalogueComponent,
        resolve: {
          categories: CategoryResolverService,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
