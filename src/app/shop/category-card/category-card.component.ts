import { Component, Input, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';
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
    return `${environment.cloudinary.categoryCardImageUrl}/${this.category.id}.jpg`;
  }

  onLoadImage() {
    this.loadingImage = false;
  }
}
