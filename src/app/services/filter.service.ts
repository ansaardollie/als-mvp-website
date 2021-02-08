import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductFilter } from '../models/product-filter.model';
import {
  CategoryFilter,
  DesignFilter,
  IFilter,
  PriceFilter,
  RangeFilter,
  SaleFilter,
} from './../models/product-filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private productFilter$ = new BehaviorSubject<ProductFilter>(new ProductFilter([]));
  private filterCategoryID$ = new BehaviorSubject<string[]>([]);
  private filterRangeID$ = new BehaviorSubject<string[]>([]);
  private filterDesignID$ = new BehaviorSubject<string[]>([]);
  private filterMinPrice$ = new BehaviorSubject<number | undefined>(undefined);
  private filterMaxPrice$ = new BehaviorSubject<number | undefined>(undefined);
  private filterSale$ = new BehaviorSubject<boolean>(false);

  private categoryIDs: string[] = [];
  private rangeIDs: string[] = [];
  private designIDs: string[] = [];
  private minPrice: number | undefined;
  private maxPrice: number | undefined;
  private onSale: boolean = false;

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

  constructor() {
  }

  addCategory(id: string) {
    this.categoryIDs.push(id);
    this.applyFilter();
  }

  deleteCategory(id: string){
    const index = this.categoryIDs.findIndex(c => c == id);
    if (!!index){
      this.categoryIDs.splice(index);
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

  deleteRange(id: string){
    const index = this.rangeIDs.findIndex(c => c == id);
    if (!!index){
      this.rangeIDs.splice(index);
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

  deleteDesign(id: string){
    const index = this.designIDs.findIndex(c => c == id);
    if (!!index){
      this.designIDs.splice(index);
    }
    this.applyFilter();
  }

  clearDesigns() {
    this.designIDs = [];
    this.applyFilter();
  }

  addMinPrice(price: number){
    this.minPrice = price;
    this.applyFilter();
  }

  removeMinPrice() {
    this.minPrice = undefined;
    this.applyFilter();
  }

  addMaxPrice(price: number){
    this.maxPrice = price;
    this.applyFilter();
  }

  removeMaxPrice() {
    this.maxPrice = undefined;
    this.applyFilter();
  }

  setSaleFilter(filterOnSale: boolean){
    this.onSale = filterOnSale;
    this.applyFilter();
  }

  applyFilter(): void {
    const filters: IFilter[] = [];
    if (this.categoryIDs.length > 0){
      const catFilter = new CategoryFilter(this.categoryIDs);
      filters.push(catFilter);
    } 
    if (this.rangeIDs.length > 0) {
      const rangeFilter = new RangeFilter(this.rangeIDs);
      filters.push(rangeFilter);
    } 
    if (this.designIDs.length > 0){
      const designFilter = new DesignFilter(this.designIDs);
      filters.push(designFilter);
    }
    if (!!this.minPrice || !!this.maxPrice){
      const priceFilter = new PriceFilter(this.minPrice, this.minPrice);
      filters.push(priceFilter);
    } 
    if (this.onSale) {
      const saleFilter = new SaleFilter();
      filters.push(saleFilter);

    }
    this.filterCategoryID$.next(this.categoryIDs.slice());
    this.filterRangeID$.next(this.rangeIDs.slice());
    this.filterDesignID$.next(this.designIDs.slice());
    this.filterMinPrice$.next(this.minPrice);
    this.filterMaxPrice$.next(this.maxPrice);
    this.filterSale$.next(this.onSale);
    this.productFilter$.next(new ProductFilter(filters));
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
