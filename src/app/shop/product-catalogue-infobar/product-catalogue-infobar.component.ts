import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-catalogue-infobar',
  templateUrl: './product-catalogue-infobar.component.html',
  styleUrls: ['./product-catalogue-infobar.component.scss'],
})
export class ProductCatalogueInfobarComponent implements OnInit {
  @Input() numProducts!: number;
  @Output() showExVatPrices: EventEmitter<boolean> = new EventEmitter();

  priceOptions: PriceType[] = [
    {
      type: 'incl',
      label: 'incl. VAT',
    },
    {
      type: 'excl',
      label: 'excl. VAT',
    },
  ];

  selectedPriceOption: PriceType;
  constructor() {
    this.selectedPriceOption = this.priceOptions[0];
  }

  ngOnInit(): void {}

  priceChange() {
    if (this.selectedPriceOption.type == 'excl') {
      this.showExVatPrices.next(true);
    } else {
      this.showExVatPrices.next(false);
    }
  }
}

interface PriceType {
  type: 'excl' | 'incl';
  label: string;
}
