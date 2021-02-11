import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';

import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  isLoadingProduct$ = new BehaviorSubject<boolean>(true);
  product!: Product;
  quantity: number = 1;
  prodSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.scroller.scrollToAnchor('navbar');
    this.prodSub = this.route.params
      .pipe(
        switchMap((params) => {
          const id = params.id;
          console.log(id);
          return this.ps.getProduct(id);
        })
      )
      .subscribe((next) => {
        this.product = next;
        this.isLoadingProduct$.next(false);
      });
  }

  get price() {
    return this.product.priceInfo.retail.inclVAT;
  }

  get stockLevel() {
    return this.product.stockLevels.HO.available;
  }
}
