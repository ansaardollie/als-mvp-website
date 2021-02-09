import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss'],
})
export class ProductCatalogueComponent implements OnInit {
  isLoadingProducts$: Observable<boolean>;
  products$: Observable<Product[]>;
  canLoadMoreProducts$: Observable<boolean>;
  productQuantity$: Observable<number>;

  constructor(private ps: ProductService) {
    this.isLoadingProducts$ = this.ps.isLoadingProducts;
    this.products$ = this.ps.products;
    this.canLoadMoreProducts$ = this.ps.canLoadMoreProducts;
    this.productQuantity$ = this.ps.productQuantity;
  }

  ngOnInit(): void {}

  loadMore(): void {
    this.ps.loadMoreProducts();
  }
}
