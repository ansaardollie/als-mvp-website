import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { ProductFilter } from './../../../models/product-filter.model';
import { CategoryService } from './../../../services/category.service';
import { DesignService } from './../../../services/design.service';
import { FilterService } from './../../../services/filter.service';
import { RangeService } from './../../../services/range.service';

@Component({
  selector: 'app-product-filter-info',
  templateUrl: './product-filter-info.component.html',
  styleUrls: ['./product-filter-info.component.scss'],
})
export class ProductFilterInfoComponent implements OnInit {
  filter$: Observable<ProductFilter>;
  filterCategories$: Observable<string[]>;
  filterRanges$: Observable<string[]>;
  filterDesigns$: Observable<string[]>;
  minPrice$: Observable<number | undefined>;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  maxPrice$: Observable<number | undefined>;
  onSale$: Observable<boolean>;

  subsink = new SubSink();
  constructor(
    private fs: FilterService,
    private cs: CategoryService,
    private ds: DesignService,
    private rs: RangeService
  ) {
    this.filter$ = this.fs.productFilter;
    this.filterCategories$ = this.fs.filterCategoryIDs;
    this.filterRanges$ = this.fs.filterRangeIDs;
    this.filterDesigns$ = this.fs.filterDesignIDs;
    this.minPrice$ = this.fs.filterMinPrice;
    this.maxPrice$ = this.fs.filterMaxPrice;
    this.onSale$ = this.fs.filterSale;

    const maxPriceSub = this.maxPrice$.subscribe((n) => (this.maxPrice = n));
    const minPriceSub = this.minPrice$.subscribe((n) => (this.minPrice = n));

    this.subsink.add(maxPriceSub, minPriceSub);
  }

  ngOnInit(): void {}

  categoryNameByID(id: string) {
    const name = this.cs.getNameByID(id);
    if (name == '') return id;
    else return name;
  }

  rangeNameByID(id: string) {
    const name = this.rs.getNameByID(id);
    if (name == '') return id;
    else return name;
  }

  designNameByID(id: string) {
    const name = this.ds.getNameByID(id);
    if (name == '') return id;
    else return name;
  }

  get minPriceLabel() {
    if (this.minPrice == undefined) {
      return '';
    } else {
      return `Min R${this.minPrice.toFixed(2)}`;
    }
  }

  get maxPriceLabel() {
    if (this.maxPrice == undefined) {
      return '';
    } else {
      return `Max R${this.maxPrice.toFixed(2)}`;
    }
  }

  removeCategory(id: string) {
    this.fs.deleteCategory(id);
  }

  removeRange(id: string) {
    this.fs.deleteRange(id);
  }

  removeDesign(id: string) {
    this.fs.deleteDesign(id);
  }

  removeMinPrice() {
    this.fs.removeMinPrice();
  }

  removeMaxPrice() {
    this.fs.removeMaxPrice();
  }

  removeSale() {
    this.fs.setSaleFilter(false);
  }
}
