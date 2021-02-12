import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { skipWhile, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';

import { CategoryInfo } from './../../models/product.model';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  isLoadingProduct$ = new BehaviorSubject<boolean>(true);
  product!: Product;
  quantity: number = 1;
  prodSub!: Subscription;
  taxonomy: CategoryInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cs: CategoryService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
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
        this.isLoadingProduct$.next(false);
      });
  }

  ngAfterViewInit() {
    this.scroller.scrollToAnchor('spacer');
  }

  get price() {
    return this.product.priceInfo.retail.inclVAT;
  }

  get stockLevel() {
    return this.product.stockLevels.HO.available;
  }
}
