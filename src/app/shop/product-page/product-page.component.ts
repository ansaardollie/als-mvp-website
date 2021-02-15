import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skipWhile, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { SubSink } from 'subsink';

import { CategoryInfo } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  wholesaleClient: boolean = false;
  isLoadingProduct = true;
  isLoadingImages = true;
  product!: Product;
  quantity: number = 1;
  taxonomy: CategoryInfo[] = [];
  featuredImageUrls: string[] = [];
  thumbailImageUrls: string[] = [];

  subsink = new SubSink();
  get isLoading() {
    return this.isLoadingImages || this.isLoadingProduct;
  }

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private scroller: ViewportScroller,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 90]);
    const prodSub = this.route.params
      .pipe(
        switchMap((params) => {
          const id = params.id;
          return this.ps.getProduct(id);
        }),
        skipWhile((p) => !p)
      )
      .subscribe((next) => {
        this.product = next;
        this.taxonomy = this.product.categories.reverse();
        this.isLoadingProduct = false;
        // const mainUrls: string[] = [];
        // const thumbUrls: string[] = [];
        // mainUrls.push(
        //   `${environment.cloudinary.productGalleryImageUrl}/products/${this.product.id}.jpg`
        // );
        // thumbUrls.push(
        //   `${environment.cloudinary.galleryThumbnailImageUrl}/products/${this.product.id}.jpg`
        // );

        // this.product.lifestyleImageIDs?.forEach((lpID) => {
        //   mainUrls.push(
        //     `${environment.cloudinary.productGalleryImageUrl}/lifestyle/${lpID}.jpg`
        //   );
        //   thumbUrls.push(
        //     `${environment.cloudinary.galleryThumbnailImageUrl}/lifestyle/${lpID}.jpg`
        //   );
        // });

        // this.featuredImageUrls = mainUrls;
        // this.thumbailImageUrls = thumbUrls;
      });
    const wholesaleSub = this.us.userIsWholesaleClient.subscribe(
      (next) => (this.wholesaleClient = next)
    );
    this.subsink.add(prodSub, wholesaleSub);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  doneLoadingImages(event: boolean) {
    this.isLoadingImages = !event;
  }

  get price() {
    if (!this.product) {
      return 0;
    }
    if (this.wholesaleClient && !!this.product.priceInfo.wholesale) {
      return this.product.priceInfo.wholesale.inclVAT;
    }
    return this.product.priceInfo.retail.inclVAT;
  }

  get stockLevel() {
    if (!this.product) {
      return 0;
    }
    return this.product.stockLevels.HO.available;
  }

  get showSalePrice(): boolean {
    if (this.wholesaleClient) {
      return false;
    } else {
      return !!this.product.priceInfo.sale;
    }
  }

  get salePrice(): number {
    if (!this.product.priceInfo.sale) return 0;
    else return this.product.priceInfo.sale.inclVAT;
  }

  get ctaLabel(): string {
    if (this.stockLevel > 0) return 'Add to Cart';
    else if (this.wholesaleClient) return 'Add To Cart\n(Backorder)';
    else return 'Notify me when available';
  }
}
