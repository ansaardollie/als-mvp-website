import { Component, Input, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() wholesaleClient: boolean = false;
  @Input() showExVatPrice: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  get price(): number {
    // if (this.product.priceInfo.sale){
    //   return this.product.priceInfo.sale.inclVAT;
    // } else {
    //   return this.product.priceInfo.retail.inclVAT;
    // }
    if (!this.wholesaleClient || !this.product.priceInfo.wholesale) {
      return this.product.priceInfo.retail.inclVAT;
    } else {
      return this.showExVatPrice
        ? this.product.priceInfo.wholesale.exclVAT
        : this.product.priceInfo.wholesale.inclVAT;
    }
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
    return `${environment.cloudinary.productCardImageUrl}/${this.product.id}.jpg`;
  }

  get showSalePrice(): boolean {
    if (this.wholesaleClient) {
      return false;
    } else {
      return !!this.product.priceInfo.sale;
    }
  }
}
