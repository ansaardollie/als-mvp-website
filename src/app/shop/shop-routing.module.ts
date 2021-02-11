import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { CategoryResolverService } from '../services/guards/category-resolver.service';
import { DesignResolverService } from '../services/guards/design-resolver.service';
import { RangeResolverService } from './../services/guards/range-resolver.service';
import { CategoryCatalogueComponent } from './category-catalogue/category-catalogue.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RangeCatalogueComponent } from './range-catalogue/range-catalogue.component';
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
        path: 'products/:id',
        component: ProductPageComponent,
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
      {
        path: 'ranges',
        component: RangeCatalogueComponent,
        resolve: {
          ranges: RangeResolverService,
          designs: DesignResolverService,
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
