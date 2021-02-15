import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

const test: Product = {
  id: 'BBG-CLA-ID-0401',
  hikeID: '1401',
  name: 'Beach Bags - Protea (Blue on Gunmetal)',
  description: '',
  range: {
    id: 'CLA',
    name: 'Classic',
    hikeID: '4',
  },
  design: {
    hikeID: '318',
    id: 'CLA-ID-0401',
    name: 'Protea (Blue on Gunmetal)',
    range: 'Classic',
  },
  type: {
    name: 'Beach Bags',
    id: 'BBG',
    hikeID: '43',
    parentID: 'BG',
    alias: 'Beach',
    nameInProduct: 'Beach Bag',
  },
  categories: [
    {
      name: 'Beach Bags',
      id: 'BBG',
      hikeID: '43',
      parentID: 'BG',
      alias: 'Beach',
      nameInProduct: 'Beach Bag',
    },
    {
      name: 'Bags',
      id: 'BG',
      parentID: 'LAA',
    },
    {
      name: 'Lifestyle & Apparel',
      id: 'LAA',
    },
  ],
  hasVariants: false,
  active: true,
  stockLevels: {
    HO: {
      available: 10,
      onHand: 10,
      committed: 0,
    },
  },
  priceInfo: {
    retail: {
      inclVAT: 590,
      exclVAT: 513.04,
    },
    wholesale: {
      exclVAT: 400,
      inclVAT: 460,
    },
  },
  lifestyleImageIDs: [
    'LSP-000079',
    'LSP-000090',
    'LSP-000101',
    'LSP-000124',
    'LSP-000135',
    'LSP-000146',
    'LSP-000157',
    'LSP-000168',
    'LSP-000179',
    'LSP-000190',
    'LSP-000201',
    'LSP-000212',
    'LSP-000224',
    'LSP-000236',
    'LSP-000247',
    'LSP-000257',
    'LSP-000268',
    'LSP-000279',
    'LSP-000290',
    'LSP-000565',
    'LSP-000569',
  ],
};

@Component({
  selector: 'app-order-form-product',
  templateUrl: './order-form-product.component.html',
  styleUrls: ['./order-form-product.component.scss'],
})
export class OrderFormProductComponent implements OnInit {
  @Input() product: Product = test;
  @Input() showExVatPrice: boolean = false;
  amount: number = 0;
  constructor() {}

  ngOnInit(): void {}

  get imageUrl(): string {
    return `${environment.cloudinary.galleryThumbnailImageUrl}/products/${this.product.id}`;
  }
  get maxStock() {
    if (!this.product) {
      return 0;
    }
    return this.product.stockLevels.HO.available;
  }

  get stockInfo() {
    if (this.maxStock <= 0) {
      return 'Backorder Only';
    } else {
      return `${this.maxStock} In Stock`;
    }
  }

  get priceInfo(): number {
    if (!this.product.priceInfo.wholesale) {
      return 0;
    } else {
      if (this.showExVatPrice) return this.product.priceInfo.wholesale.exclVAT;
      else return this.product.priceInfo.wholesale.inclVAT;
    }
  }
}
