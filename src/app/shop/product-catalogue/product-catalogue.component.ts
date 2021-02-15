import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { Product } from './../../models/product.model';
import { FilterService } from './../../services/filter.service';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';

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
  wholesaleClient: boolean = false;
  showPricesExVat: boolean = false;

  subsink = new SubSink();

  constructor(
    private ps: ProductService,
    private fs: FilterService,
    private route: ActivatedRoute,
    private us: UserService
  ) {
    this.isLoadingProducts$ = this.ps.isLoadingProducts;
    this.products$ = this.ps.products;
    this.canLoadMoreProducts$ = this.ps.canLoadMoreProducts;
    this.productQuantity$ = this.ps.productQuantity;

    this.route.queryParams.subscribe((params) =>
      this.handleQueryParams(params)
    );
  }

  ngOnInit(): void {
    this.subsink.add(
      this.us.userIsWholesaleClient.subscribe((isWholesaleClient) => {
        this.wholesaleClient = isWholesaleClient;
      })
    );
  }

  ngOnDestroy(): void {
    this.fs.clearFilter();
  }

  loadMore(): void {
    this.ps.loadMoreProducts();
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

  priceTypeChange(showExVatPrices: boolean) {
    this.showPricesExVat = showExVatPrices;
  }
}
