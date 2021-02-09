import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { ProductFilter } from './../../models/product-filter.model';
import { CategoryInfo, DesignInfo, RangeInfo } from './../../models/product.model';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  currentFilter: ProductFilter = ProductFilter.noFilter();
  selectedCategories: string[] = [];
  selectedDesigns: string[] = [];
  selectedRanges: string[] = [];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onSale: boolean = false;

  categories: CategoryInfo[] = [];
  ranges: RangeInfo[] = [];
  designs: any[] = [];

  subsink: SubSink = new SubSink();

  defaultNameSort(a: { name: string }, b: { name: string }) {
    return a.name.localeCompare(b.name);
  }

  constructor(private http: HttpClient, private fs: FilterService) {
    const filterSub = this.fs.productFilter.subscribe(
      (n) => (this.currentFilter = n)
    );
    const catSub = this.fs.filterCategoryIDs.subscribe(
      (n) => (this.selectedCategories = n)
    );
    const rangeSub = this.fs.filterRangeIDs.subscribe(
      (n) => (this.selectedRanges = n)
    );
    const designSub = this.fs.filterDesignIDs.subscribe(
      (n) => (this.selectedDesigns = n)
    );

    const minPriceSub = this.fs.filterMinPrice.subscribe(
      (n) => (this.minPrice = n)
    );
    const maxPriceSub = this.fs.filterMaxPrice.subscribe(
      (n) => (this.maxPrice = n)
    );
    const saleSub = this.fs.filterSale.subscribe((n) => (this.onSale = n));

    this.subsink.add(
      filterSub,
      catSub,
      rangeSub,
      designSub,
      minPriceSub,
      maxPriceSub,
      saleSub
    );
    this.loadMockData();
  }

  loadMockData(): void {
    this.http
      .get<CategoryInfo[]>('http://localhost:3000/categories')
      .subscribe((categories) => {
        this.categories = categories.sort(this.defaultNameSort);
      });
    this.http
      .get<RangeInfo[]>('http://localhost:3000/ranges')
      .subscribe((ranges) => {
        this.ranges = ranges.sort(this.defaultNameSort);
      });
    this.http
      .get<DesignInfo[]>('http://localhost:3000/designs')
      .subscribe((designs) => {
        this.designs = designs.sort(this.defaultNameSort);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  categoriesChanges(): void {
    this.fs.addCategories(this.selectedCategories);
  }

  rangeChanges(): void {
    this.fs.addRanges(this.selectedRanges);
  }

  designChanges(): void {
    this.fs.addDesigns(this.selectedDesigns);
  }

  minPriceChanges(): void {
    this.fs.addMinPrice(this.minPrice);
  }

  maxPriceChanges(): void {
    this.fs.addMaxPrice(this.maxPrice);
  }

  saleChanges(): void {
    this.fs.setSaleFilter(this.onSale);
  }

  clearFilter(): void {
    this.fs.clearFilter();
  }

  clearCategories(): void {
    this.fs.clearCategories();
  }

  clearDesigns(): void {
    this.fs.clearDesigns();
  }

  clearRanges(): void {
    this.fs.clearRanges();
  }

  clearPrice(): void {
    this.fs.removeMaxPrice();
    this.fs.removeMinPrice();
    this.fs.setSaleFilter(false);
  }
}
