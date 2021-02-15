import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubSink } from 'subsink';

import { CategorySortedProductList } from './../../models/product.model';
import { FilterService } from './../../services/filter.service';

interface CatInfo {
  id: string;
  name: string;
}

@Component({
  selector: 'app-order-form-page',
  templateUrl: './order-form-page.component.html',
  styleUrls: ['./order-form-page.component.scss'],
})
export class OrderFormPageComponent implements OnInit {
  displayFilter: boolean = false;
  amount = 0;
  sortedProductList: CategorySortedProductList = {};
  isLoading$: Observable<boolean>;
  canLoadMoreProducts$: Observable<boolean>;
  productQuantity$: Observable<number>;
  exVatPricing: boolean = false;

  subsink = new SubSink();

  constructor(
    private scroller: ViewportScroller,
    private ps: ProductService,
    private cs: CategoryService,
    private fs: FilterService,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.ps.isLoadingProducts;
    this.canLoadMoreProducts$ = this.ps.canLoadMoreProducts;
    this.productQuantity$ = this.ps.productQuantity;
    const sub = this.ps.products.subscribe((pl) => {
      console.log('new product list', pl);
      let start = new Date();
      const catIDs = pl.map((p) => p.type.id);

      const uniqueCatIDs = [...new Set(catIDs)];
      const result: CategorySortedProductList = {};

      uniqueCatIDs.forEach((id) => {
        result[id] = pl.filter((p) => p.type.id == id);
      });

      let end = new Date();
      console.log(result);
      this.sortedProductList = result;
    });

    const routeSub = this.route.queryParams.subscribe((params) =>
      this.handleQueryParams(params)
    );

    this.subsink.add(sub);
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.scroller.scrollToPosition([0, 90]);
  }

  get categories(): string[] {
    const ids = Object.keys(this.sortedProductList);
    return ids;
  }

  getCategoryName(id: string) {
    return this.cs.getNameByID(id);
  }

  loadMore(): void {
    this.ps.loadMoreProducts();
  }

  openFilter(): void {
    this.displayFilter = true;
  }

  handleQueryParams(params: Params) {
    if (!!params.category) {
      const cats = (params.category as string).split(',');
      this.fs.addCategories(cats);
    } else {
      this.fs.clearCategories();
    }
    if (!!params.range) {
      const ranges = (params.range as string).split(',');
      this.fs.addRanges(ranges);
    } else {
      this.fs.clearRanges();
    }
    if (!!params.design) {
      const designs = (params.design as string).split(',');
      this.fs.addDesigns(designs);
    } else {
      this.fs.clearDesigns();
    }
    if (!!params.min) {
      const minPrice = parseFloat(params.min as string);
      this.fs.addMinPrice(minPrice);
    } else {
      this.fs.removeMinPrice();
    }
    if (!!params.max) {
      const maxPrice = parseFloat(params.max as string);
      this.fs.addMaxPrice(maxPrice);
    } else {
      this.fs.removeMaxPrice();
    }
    if (!!params.sale) {
      const onSale = params.sale == 'true';
      this.fs.setSaleFilter(onSale);
    } else {
      this.fs.setSaleFilter(false);
    }
  }

  showPricesExVat(value: boolean) {
    this.exVatPricing = value;
  }
}
