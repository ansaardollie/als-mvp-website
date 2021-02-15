import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

import { ProductFilter } from './../models/product-filter.model';
import { CategorySortedProductList, Product } from './../models/product.model';
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
  private productMasterList$ = new BehaviorSubject<Product[]>(
    this.productMasterList
  );
  private productFilteredList$ = new BehaviorSubject<Product[]>(
    this.productFilteredList
  );
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

  get masterProducts() {
    return this.productMasterList$.asObservable();
  }

  get masterFilteredProducts() {
    return this.productFilteredList$.asObservable();
  }

  get productQuantity() {
    return this.productQuantity$.asObservable();
  }

  get categorySortedProducts(): Observable<CategorySortedProductList> {
    return this.products.pipe(
      skipWhile((pml) => pml.length == 0),
      map((pml) => {
        let start = new Date();
        const catIDs = pml.map((p) => p.type.id);

        const uniqueCatIDs = [...new Set(catIDs)];
        const result: CategorySortedProductList = {};

        uniqueCatIDs.forEach((id) => {
          result[id] = pml.filter((p) => p.type.id == id).slice(0, 1);
        });

        let end = new Date();
        return result;
      })
    );
  }

  constructor(private http: HttpClient, private fs: FilterService) {
    this.loadMasterProductList();
    this.filterSub = this.fs.productFilter.subscribe(
      (filter) => this.handleNewFilter(filter),
      this.handleNewFilterError
    );
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
        this.isLoadingProducts$.next(false);
        this.productMasterList$.next(this.productMasterList);
        if (this.productFilter.hasFilters) {
          this.handleNewFilter(this.productFilter);
        } else {
          this.handleNewFilter(ProductFilter.noFilter());
        }
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
      this.productFilteredList$.next(this.productFilteredList);
    } else {
      this.productFilteredList = this.productMasterList.slice();
      this.productFilteredList$.next(this.productFilteredList);
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

  getProduct(id: string) {
    return this.productMasterList$.pipe(
      skipWhile((pml) => pml.length == 0),
      map((pml) => {
        const prod = pml.find((p) => p.id == id);
        if (!prod) {
          throw new Error('Product ID is invalid');
        } else {
          return prod;
        }
      })
    );
  }
}
