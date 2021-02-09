import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from './../../models/product.model';
import { FilterService } from './../../services/filter.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss'],
})
export class ProductCatalogueComponent implements OnInit, OnDestroy {
  isLoadingProducts$: Observable<boolean>;
  products$: Observable<Product[]>;
  canLoadMoreProducts$: Observable<boolean>;
  productQuantity$: Observable<number>;

  constructor(
    private ps: ProductService,
    private fs: FilterService,
    private route: ActivatedRoute
  ) {
    this.isLoadingProducts$ = this.ps.isLoadingProducts;
    this.products$ = this.ps.products;
    this.canLoadMoreProducts$ = this.ps.canLoadMoreProducts;
    this.productQuantity$ = this.ps.productQuantity;

    this.route.queryParams.subscribe((params) => {
      if (!!params.category) {
        const cats = (params.category as string).split(',');
        this.fs.addCategories(cats);
      }
      if (!!params.range) {
        const ranges = (params.range as string).split(',');
        this.fs.addRanges(ranges);
      }
      if (!!params.design) {
        const designs = (params.design as string).split(',');
        this.fs.addDesigns(designs);
      }
      if (!!params.min) {
        const minPrice = parseFloat(params.min as string);
        this.fs.addMinPrice(minPrice);
      }
      if (!!params.max) {
        const maxPrice = parseFloat(params.max as string);
        this.fs.addMaxPrice(maxPrice);
      }
      if (!!params.sale) {
        const onSale = params.sale == 'true';
        this.fs.setSaleFilter(onSale);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.fs.clearFilter();
  }

  loadMore(): void {
    this.ps.loadMoreProducts();
  }
}
