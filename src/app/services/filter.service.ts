import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';

import { PriceFilter, PriceType, ProductFilter, WholesaleFilter } from '../models/product-filter.model';
import { CategoryFilter, DesignFilter, IFilter, RangeFilter, SaleFilter } from './../models/product-filter.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService implements OnDestroy {
  private productFilter$ = new BehaviorSubject<ProductFilter>(
    ProductFilter.noFilter()
  );
  private filterCategoryID$ = new BehaviorSubject<string[]>([]);
  private filterRangeID$ = new BehaviorSubject<string[]>([]);
  private filterDesignID$ = new BehaviorSubject<string[]>([]);
  private filterMinPrice$ = new BehaviorSubject<number | undefined>(undefined);
  private filterMaxPrice$ = new BehaviorSubject<number | undefined>(undefined);
  private filterSale$ = new BehaviorSubject<boolean>(false);
  private filterWholesaleOnly$ = new BehaviorSubject<boolean>(false);

  private categoryIDs: string[] = [];
  private rangeIDs: string[] = [];
  private designIDs: string[] = [];
  private minPrice: number | undefined;
  private maxPrice: number | undefined;
  private onSale: boolean = false;
  private wholesaleOnly: boolean = false;

  private subsink = new SubSink();

  get productFilter() {
    return this.productFilter$.asObservable();
  }

  get filterCategoryIDs() {
    return this.filterCategoryID$.asObservable();
  }

  get filterRangeIDs() {
    return this.filterRangeID$.asObservable();
  }

  get filterDesignIDs() {
    return this.filterDesignID$.asObservable();
  }

  get filterMinPrice() {
    return this.filterMinPrice$.asObservable();
  }

  get filterMaxPrice() {
    return this.filterMaxPrice$.asObservable();
  }

  get filterSale() {
    return this.filterSale$.asObservable();
  }

  get filterWholesaleOnly() {
    return this.filterWholesaleOnly$.asObservable();
  }

  constructor(private router: Router, private us: UserService) {
    this.subsink.add(
      this.us.userIsWholesaleClient.subscribe((isWholesaleClient) => {
        this.wholesaleOnly = isWholesaleClient;
        this.applyFilter();
      })
    );
  }

  ngOnDestroy(): void {}

  addCategory(id: string) {
    this.categoryIDs.push(id);
    this.applyFilter();
  }

  addCategories(ids: string[]) {
    // if (ids.length > 0) {
    //   ids
    //     .filter((id) => this.categoryIDs.indexOf(id) === -1)
    //     .forEach((id) => this.addCategory(id));
    // } else {
    //   this.clearCategories();
    // }
    this.categoryIDs = ids;
    this.applyFilter();
  }

  deleteCategory(id: string) {
    const index = this.categoryIDs.findIndex((c) => c == id);
    if (index >= 0) {
      this.categoryIDs.splice(index, 1);
    }
    this.applyFilter();
  }

  clearCategories() {
    this.categoryIDs = [];
    this.applyFilter();
  }

  addRange(id: string) {
    this.rangeIDs.push(id);
    this.applyFilter();
  }

  addRanges(ids: string[]) {
    // if (ids.length > 0) {
    //   ids
    //     .filter((id) => this.rangeIDs.indexOf(id) === -1)
    //     .forEach((id) => this.addRange(id));
    // } else {
    //   this.clearRanges();
    // }
    this.rangeIDs = ids;
    this.applyFilter();
  }

  deleteRange(id: string) {
    const index = this.rangeIDs.findIndex((c) => c == id);
    if (index >= 0) {
      this.rangeIDs.splice(index, 1);
    }
    this.applyFilter();
  }

  clearRanges() {
    this.rangeIDs = [];
    this.applyFilter();
  }

  addDesign(id: string) {
    this.designIDs.push(id);
    this.applyFilter();
  }

  addDesigns(ids: string[]) {
    // if (ids.length > 0) {
    //   ids
    //     .filter((id) => this.designIDs.indexOf(id) === -1)
    //     .forEach((id) => this.addDesign(id));
    // } else {
    //   this.clearCategories();
    // }
    this.designIDs = ids;
    this.applyFilter();
  }

  deleteDesign(id: string) {
    const index = this.designIDs.findIndex((c) => c == id);
    if (index >= 0) {
      this.designIDs.splice(index, 1);
    }
    this.applyFilter();
  }

  clearDesigns() {
    this.designIDs = [];
    this.applyFilter();
  }

  addMinPrice(price?: number) {
    this.minPrice = price;
    this.applyFilter();
  }

  removeMinPrice() {
    this.minPrice = undefined;
    this.applyFilter();
  }

  addMaxPrice(price?: number) {
    this.maxPrice = price;
    this.applyFilter();
  }

  removeMaxPrice() {
    this.maxPrice = undefined;
    this.applyFilter();
  }

  setSaleFilter(filterOnSale: boolean) {
    this.onSale = filterOnSale;
    this.applyFilter();
  }

  setWholesaleFilter(filterWholesale: boolean) {
    this.wholesaleOnly = filterWholesale;
    this.applyFilter();
  }

  applyFilter(): void {
    const filters: IFilter[] = [];
    const catFilter = new CategoryFilter(this.categoryIDs);
    const rangeFilter = new RangeFilter(this.rangeIDs);
    const designFilter = new DesignFilter(this.designIDs);
    const priceFilter = new PriceFilter(
      this.minPrice,
      this.maxPrice,
      this.onSale ? PriceType.SALE : PriceType.RETAIL
    );
    const saleFilter = new SaleFilter(this.onSale);
    const wholesaleFilter = new WholesaleFilter(this.wholesaleOnly);

    this.filterCategoryID$.next(this.categoryIDs.slice());
    this.filterRangeID$.next(this.rangeIDs.slice());
    this.filterDesignID$.next(this.designIDs.slice());
    this.filterMinPrice$.next(this.minPrice);
    this.filterMaxPrice$.next(this.maxPrice);
    this.filterSale$.next(this.onSale);
    const newFilter = ProductFilter.fromObject({
      categoryFilter: catFilter,
      rangeFilter: rangeFilter,
      designFilter: designFilter,
      priceFilter: priceFilter,
      saleFilter: saleFilter,
      wholesaleFilter: wholesaleFilter,
    });
    this.productFilter$.next(newFilter);
  }

  clearFilter(): void {
    this.clearCategories();
    this.clearDesigns();
    this.clearRanges();
    this.removeMaxPrice();
    this.removeMinPrice();
    this.setSaleFilter(false);
  }
}
