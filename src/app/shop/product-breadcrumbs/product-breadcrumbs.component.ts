import { Component, Input, OnInit } from '@angular/core';

import { CategoryInfo } from './../../models/product.model';

@Component({
  selector: 'app-product-breadcrumbs',
  templateUrl: './product-breadcrumbs.component.html',
  styleUrls: ['./product-breadcrumbs.component.scss'],
})
export class ProductBreadcrumbsComponent implements OnInit {
  @Input() taxonomy!: CategoryInfo[];

  constructor() {}

  ngOnInit(): void {}
}
