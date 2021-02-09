import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Product } from '../models/product.model';
import { RangeInfo } from './../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class RangeService {
  private ranges$ = new BehaviorSubject<RangeInfo[]>([]);
  private productMasterList: Product[] = [];
  private pmlSub: Subscription;
  private rangeMasterList: RangeInfo[] = [];

  get ranges() {
    return this.ranges$.asObservable();
  }

  constructor(private http: HttpClient, private ps: ProductService) {
    this.pmlSub = this.ps.masterProducts.subscribe((masterProducts) => {
      this.productMasterList = masterProducts;
      this.loadRangeMasterList();
    });
  }

  ngOnDestroy(): void {
    this.pmlSub.unsubscribe();
  }

  private loadRangeMasterList() {
    this.http
      .get<RangeInfo[]>('http://localhost:3000/ranges')
      .subscribe((ranges) => {
        this.rangeMasterList = ranges.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.pushRanges();
      });
  }

  private pushRanges() {
    const cats = this.rangeMasterList.filter((c) => {
      const index = this.productMasterList.findIndex((p) =>
        this.productBelongsToRange(p, c)
      );
      return index >= 0;
    });
    this.ranges$.next(cats);
  }

  private productBelongsToRange(product: Product, range: RangeInfo) {
    return product.range.id == range.id;
  }
}
