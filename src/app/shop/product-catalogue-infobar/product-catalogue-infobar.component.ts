import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-catalogue-infobar',
  templateUrl: './product-catalogue-infobar.component.html',
  styleUrls: ['./product-catalogue-infobar.component.scss'],
})
export class ProductCatalogueInfobarComponent implements OnInit {
  @Input() numProducts!: number;

  constructor() {}

  ngOnInit(): void {}
}
