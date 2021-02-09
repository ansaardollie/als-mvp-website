import { Component, Input, OnInit } from '@angular/core';

import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}

  ngOnInit(): void {}

  get price(): number {
    // if (this.product.priceInfo.sale){
    //   return this.product.priceInfo.sale.inclVAT;
    // } else {
    //   return this.product.priceInfo.retail.inclVAT;
    // }
    return this.product.priceInfo.retail.inclVAT;
  }

  get inStock(): boolean {
    const HO = this.product.stockLevels.HO;
    const MR = this.product.stockLevels.MR;
    const WS = this.product.stockLevels.WS;

    if (HO.available > 0) {
      return true;
    }
    if (MR && MR.available > 0) {
      return true;
    }
    if (WS && WS.available > 0) {
      return true;
    }
    return false;
  }

  get imageURL(): string {
    return `https://res.cloudinary.com/als-trial-webstore/image/upload/t_product-card/products/${this.product.id}.jpg`;
  }
}
