import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryCatalogueComponent } from './category-catalogue/category-catalogue.component';
import { DesignCardComponent } from './design-card/design-card.component';
import { ProductBreadcrumbsComponent } from './product-breadcrumbs/product-breadcrumbs.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductImageGalleryComponent } from './product-image-gallery/product-image-gallery.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductSkeletonComponent } from './product-skeleton/product-skeleton.component';
import { RangeCatalogueComponent } from './range-catalogue/range-catalogue.component';
import { RangeDesignCatalogueComponent } from './range-design-catalogue/range-design-catalogue.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductSkeletonComponent,
    ProductCatalogueComponent,
    ShopComponent,
    CategoryCatalogueComponent,
    CategoryCardComponent,
    RangeCatalogueComponent,
    RangeDesignCatalogueComponent,
    DesignCardComponent,
    ProductPageComponent,
    ProductImageGalleryComponent,
    ProductBreadcrumbsComponent,
  ],
  imports: [CommonModule, SharedModule, ShopRoutingModule],
})
export class ShopModule {}
