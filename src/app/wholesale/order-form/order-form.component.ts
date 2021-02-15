import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorySortedProductList } from 'src/app/models/product.model';
import { SubSink } from 'subsink';

import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';

interface CatInfo {
  id: string;
  name: string;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, AfterViewInit, OnDestroy {
  amount: number = 2;
  sortedProductList: CategorySortedProductList = {};
  isLoading: Observable<boolean>;

  subsink = new SubSink();
  constructor(
    private scroller: ViewportScroller,
    private ps: ProductService,
    private cs: CategoryService
  ) {
    this.isLoading = this.ps.isLoadingProducts;
    const sub = this.ps.products.subscribe((pl) => {
      let start = new Date();
      const catIDs = pl.map((p) => p.type.id);

      const uniqueCatIDs = [...new Set(catIDs)];
      const result: CategorySortedProductList = {};

      uniqueCatIDs.forEach((id) => {
        result[id] = pl.filter((p) => p.type.id == id).slice(0, 1);
      });

      let end = new Date();
      console.log(result);
      this.sortedProductList = result;
    });

    this.subsink.add(sub);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.scroller.scrollToPosition([0, 90]);
  }

  get categories(): CatInfo[] {
    const data: CatInfo[] = [];
    const ids = Object.keys(this.sortedProductList);
    ids.forEach((id) => {
      data.push({
        id: id,
        name: this.cs.getNameByID(id),
      });
    });
    return data;
  }

  // productsInCategory(id: string): Product[] {
  //   return this.products$.pipe(
  //     map(
  //       pl => {
  //         return pl.filter(p => p.type.id == )
  //       }
  //     )
  //   )
  // }
}
