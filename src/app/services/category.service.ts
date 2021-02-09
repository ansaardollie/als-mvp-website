import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { CategoryInfo, Product } from './../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements OnDestroy {
  private categories$ = new BehaviorSubject<CategoryInfo[]>([]);
  private productMasterList: Product[] = [];
  private pmlSub: Subscription;
  private categoryMasterList: CategoryInfo[] = [];

  get categories() {
    return this.categories$.asObservable();
  }

  constructor(private http: HttpClient, private ps: ProductService) {
    this.pmlSub = this.ps.masterProducts.subscribe((masterProducts) => {
      this.productMasterList = masterProducts;
      this.loadCategoryMasterList();
    });
  }

  ngOnDestroy(): void {
    this.pmlSub.unsubscribe();
  }

  private loadCategoryMasterList() {
    this.http
      .get<CategoryInfo[]>('http://localhost:3000/categories')
      .subscribe((categories) => {
        this.categoryMasterList = categories.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.pushCategories();
      });
  }

  private pushCategories() {
    const cats = this.categoryMasterList.filter((c) => {
      const index = this.productMasterList.findIndex((p) =>
        this.productBelongsToCategory(p, c)
      );
      return index >= 0;
    });
    this.categories$.next(cats);
  }

  private productBelongsToCategory(product: Product, category: CategoryInfo) {
    const catID = category.id;
    const index = product.categories.findIndex((c) => c.id == catID);
    return index >= 0;
  }
}