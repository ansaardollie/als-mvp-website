import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Product } from '../models/product.model';
import { DesignInfo } from './../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  private designs$ = new BehaviorSubject<DesignInfo[]>([]);
  private productMasterList: Product[] = [];
  private pmlSub: Subscription;
  private designMasterList: DesignInfo[] = [];

  get designs() {
    return this.designs$.asObservable();
  }

  constructor(private http: HttpClient, private ps: ProductService) {
    this.pmlSub = this.ps.masterProducts.subscribe((masterProducts) => {
      this.productMasterList = masterProducts;
      this.loadDesignMasterList();
    });
  }

  ngOnDestroy(): void {
    this.pmlSub.unsubscribe();
  }

  private loadDesignMasterList() {
    this.http
      .get<DesignInfo[]>('http://localhost:3000/designs')
      .subscribe((designs) => {
        this.designMasterList = designs.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.pushDesigns();
      });
  }

  private pushDesigns() {
    const cats = this.designMasterList.filter((c) => {
      const index = this.productMasterList.findIndex((p) =>
        this.productBelongsToDesign(p, c)
      );
      return index >= 0;
    });
    this.designs$.next(cats);
  }

  private productBelongsToDesign(product: Product, design: DesignInfo) {
    return product.design.id == design.id;
  }
}
