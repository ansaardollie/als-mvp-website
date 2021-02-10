import { Component, Input, OnInit } from '@angular/core';

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
    return `https://res.cloudinary.com/als-trial-webstore/image/upload/t_designV1/designs/${this.id}.jpg`;
  }

  onLoadImage() {
    this.loadingImage = false;
  }
}
