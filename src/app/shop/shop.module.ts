import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CatalogueInfobarComponent } from './catalogue-infobar/catalogue-infobar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductFilterInfoComponent } from './product-filter-info/product-filter-info.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductSkeletonComponent } from './product-skeleton/product-skeleton.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [
    CatalogueInfobarComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductFilterInfoComponent,
    ProductSkeletonComponent,
    ProductCatalogueComponent,
    ShopComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
  ],
})
export class ShopModule {}
