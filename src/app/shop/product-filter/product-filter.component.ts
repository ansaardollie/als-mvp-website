import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { ProductFilter } from './../../models/product-filter.model';
import { CategoryInfo, DesignInfo, RangeInfo } from './../../models/product.model';
import { CategoryService } from './../../services/category.service';
import { DesignService } from './../../services/design.service';
import { FilterService } from './../../services/filter.service';
import { RangeService } from './../../services/range.service';

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

  categories$: Observable<CategoryInfo[]>;
  ranges$: Observable<RangeInfo[]>;
  designs$: Observable<DesignInfo[]>;

  subsink: SubSink = new SubSink();

  defaultNameSort(a: { name: string }, b: { name: string }) {
    return a.name.localeCompare(b.name);
  }

  constructor(
    private router: Router,
    private fs: FilterService,
    private cs: CategoryService,
    private rs: RangeService,
    private ds: DesignService,
    private scroller: ViewportScroller
  ) {
    this.categories$ = this.cs.categories;
    this.ranges$ = this.rs.ranges;
    this.designs$ = this.ds.designs;
    const filterSub = this.fs.productFilter.subscribe((n) => {
      this.currentFilter = n;
      this.scroller.scrollToPosition([0, 0]);
    });
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
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  filter() {
    let categories = undefined;
    let ranges = undefined;
    let designs = undefined;
    let min = undefined;
    let max = undefined;
    let sale = undefined;

    if (this.selectedCategories.length > 0) {
      categories = this.selectedCategories.join(',');
    }
    if (this.selectedRanges.length > 0) {
      ranges = this.selectedRanges.join(',');
    }
    if (this.selectedDesigns.length > 0) {
      designs = this.selectedDesigns.join(',');
    }
    if (this.minPrice) {
      min = this.minPrice.toString();
    }
    if (this.maxPrice) {
      max = this.maxPrice.toString();
    }
    if (this.onSale) {
      sale = 'true';
    }

    this.router.navigate([], {
      queryParams: {
        category: categories,
        range: ranges,
        design: designs,
        min: min,
        max: max,
        sale: sale,
      },
      replaceUrl: false,
      queryParamsHandling: 'merge',
    });
  }

  clearFilter(): void {
    this.selectedCategories = [];
    this.selectedDesigns = [];
    this.selectedRanges = [];
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.onSale = false;
    this.filter();
  }

  clearCategories(): void {
    this.selectedCategories = [];
    this.filter();
  }

  clearDesigns(): void {
    this.selectedDesigns = [];
    this.filter();
  }

  clearRanges(): void {
    this.selectedRanges = [];
    this.filter();
  }

  clearPrice(): void {
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.onSale = false;
    this.filter();
  }
}
