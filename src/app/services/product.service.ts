import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ProductFilter } from './../models/product-filter.model';
import { Product } from './../models/product.model';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnDestroy {
  private productMasterList: Product[] = [];
  private productFilteredList: Product[] = [];
  private productFilter: ProductFilter = ProductFilter.noFilter();
  private pageSize: number = 72;
  private filterSub: Subscription;

  private isLoadingProducts$ = new BehaviorSubject<boolean>(false);
  private products$ = new BehaviorSubject<Product[]>(this.productMasterList);
  private canLoadMoreProducts$ = new BehaviorSubject<boolean>(false);
  private productQuantity$ = new BehaviorSubject<number>(0);

  get isLoadingProducts() {
    return this.isLoadingProducts$.asObservable();
  }

  get canLoadMoreProducts() {
    return this.canLoadMoreProducts$.asObservable();
  }

  get products() {
    return this.products$.asObservable();
  }

  get productQuantity() {
    return this.productQuantity$.asObservable();
  }

  constructor(private http: HttpClient, private fs: FilterService) {
    this.loadMasterProductList();
    this.filterSub = this.fs.productFilter.subscribe((filter) => {
      this.pageSize = 72;
      this.productFilter = filter;
      this.pushProducts();
    }, this.handleNewFilterError);
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }

  private loadMasterProductList(): void {
    this.isLoadingProducts$.next(true);
    this.http
      .get<Product[]>('http://localhost:3000/products')
      .subscribe((response) => {
        this.productMasterList = response
          .filter((p) => p.active)
          .sort(this.defaultProductSort);
        console.log('Num of products in ml', this.productMasterList.length);
        this.isLoadingProducts$.next(false);
        this.handleNewFilter(ProductFilter.noFilter());
      });
  }

  private defaultProductSort(a: Product, b: Product): number {
    const typeA = a.type.name;
    const typeB = b.type.name;
    if (typeA.localeCompare(typeB) !== 0) {
      return typeA.localeCompare(typeB);
    } else {
      const rangeA = a.range.name;
      const rangeB = b.range.name;
      if (rangeA.localeCompare(rangeB) !== 0) {
        return rangeA.localeCompare(rangeB);
      } else {
        const designA = a.design.name;
        const designB = b.design.name;
        return designA.localeCompare(designB);
      }
    }
  }

  pushProducts(): void {
    if (this.productFilter.hasFilters) {
      this.productFilteredList = this.productMasterList.filter((p) =>
        this.productFilter.check(p)
      );
    } else {
      this.productFilteredList = this.productMasterList.slice();
    }
    const qty = this.productFilteredList.length;
    const products = this.productFilteredList.slice(0, this.pageSize);
    this.canLoadMoreProducts$.next(
      this.productFilteredList.length > this.pageSize
    );
    this.products$.next(products);
    this.productQuantity$.next(qty);
  }

  loadMoreProducts(): void {
    const canLoadMore = this.canLoadMoreProducts$.value;
    if (canLoadMore) {
      this.pageSize += 72;
      this.pushProducts();
    }
  }

  private handleNewFilter(filter: ProductFilter): void {
    this.pageSize = 72;
    this.productFilter = filter;
    this.pushProducts();
  }

  private handleNewFilterError(error: any): void {
    console.error(error);
  }
}
