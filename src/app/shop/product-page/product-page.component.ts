import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { skipWhile, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

import { CategoryInfo } from './../../models/product.model';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  isLoadingProduct = true;
  isLoadingImages = true;
  product!: Product;
  quantity: number = 1;
  prodSub!: Subscription;
  taxonomy: CategoryInfo[] = [];
  featuredImageUrls: string[] = [];
  thumbailImageUrls: string[] = [];

  get isLoading() {
    return this.isLoadingImages || this.isLoadingProduct;
  }

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cs: CategoryService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 90]);
    console.log('Scrolled from Product Page');
    this.prodSub = this.route.params
      .pipe(
        switchMap((params) => {
          const id = params.id;
          console.log(id);
          return this.ps.getProduct(id);
        }),
        skipWhile((p) => !p)
      )
      .subscribe((next) => {
        this.product = next;
        this.taxonomy = this.product.categories.reverse();
        this.isLoadingProduct = false;
        const mainUrls: string[] = [];
        const thumbUrls: string[] = [];
        mainUrls.push(
          `${environment.cloudinary.productGalleryImageUrl}/products/${this.product.id}.jpg`
        );
        thumbUrls.push(
          `${environment.cloudinary.galleryThumbnailImageUrl}/products/${this.product.id}.jpg`
        );

        this.product.lifestyleImageIDs?.forEach((lpID) => {
          mainUrls.push(
            `${environment.cloudinary.productGalleryImageUrl}/lifestyle/${lpID}.jpg`
          );
          thumbUrls.push(
            `${environment.cloudinary.galleryThumbnailImageUrl}/lifestyle/${lpID}.jpg`
          );
        });

        this.featuredImageUrls = mainUrls;
        this.thumbailImageUrls = thumbUrls;
      });
  }

  doneLoadingImages(event: boolean) {
    this.isLoadingImages = !event;
  }

  get price() {
    if (!this.product) {
      return 0;
    }
    return this.product.priceInfo.retail.inclVAT;
  }

  get stockLevel() {
    if (!this.product) {
      return 0;
    }
    return this.product.stockLevels.HO.available;
  }
}
