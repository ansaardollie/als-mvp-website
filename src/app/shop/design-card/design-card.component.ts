import { Component, Input, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-design-card',
  templateUrl: './design-card.component.html',
  styleUrls: ['./design-card.component.scss'],
})
export class DesignCardComponent implements OnInit {
  @Input() id!: string;
  @Input() name!: string;

  loadingImage: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  get imageURL() {
    return `${environment.cloudinary.designCardImageUrl}/${this.id}.jpg`;
  }

  onLoadImage() {
    this.loadingImage = false;
  }
}
