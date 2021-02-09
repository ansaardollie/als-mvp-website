import { Component, Input, OnInit } from '@angular/core';

import { CategoryInfo } from './../../models/product.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: CategoryInfo;
  loadingImage = true;

  constructor() {}

  ngOnInit(): void {}

  get imageURL() {
    return `https://res.cloudinary.com/als-trial-webstore/image/upload/t_category_card/categories/${this.category.id}.jpg`;
  }

  onLoadImage() {
    this.loadingImage = false;
  }
}
