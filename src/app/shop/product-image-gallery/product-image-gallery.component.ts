import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-image-gallery',
  templateUrl: './product-image-gallery.component.html',
  styleUrls: ['./product-image-gallery.component.scss'],
  animations: [
    trigger('imageState', [
      state(
        'featured',
        style({
          top: '0px',
          left: '0px',
          transform: 'translateX(0)',
        })
      ),
      state(
        'after',
        style({
          top: '0px',
          left: '0px',
          transform: 'translateX(500px)',
        })
      ),
      state(
        'before',
        style({
          top: '0px',
          left: '0px',
          transform: 'translateX(-500px)',
        })
      ),
      transition('featured <=> *', animate(400)),
      transition('after <=> before', [
        style({
          display: 'none',
        }),
        animate(400),
        style({
          display: 'block',
        }),
      ]),
    ]),
  ],
})
export class ProductImageGalleryComponent implements OnInit {
  @Input() product!: Product;
  isLoading: boolean = true;
  imageUrls: string[] = [];
  thumbnailUrls: string[] = [];
  selectedIndex: number = 0;
  featuredStates: string[] = [];
  hiddenStates: boolean[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.imageUrls.push(
      `${environment.cloudinary.productGalleryImageUrl}/products/${this.product.id}.jpg`
    );

    this.thumbnailUrls.push(
      `${environment.cloudinary.galleryThumbnailImageUrl}/products/${this.product.id}.jpg`
    );

    this.featuredStates.push('featured');
    this.hiddenStates.push(false);

    this.product.lifestyleImageIDs?.forEach((lpID) => {
      this.imageUrls.push(
        `${environment.cloudinary.productGalleryImageUrl}/lifestyle/${lpID}.jpg`
      );
      this.thumbnailUrls.push(
        `${environment.cloudinary.galleryThumbnailImageUrl}/lifestyle/${lpID}.jpg`
      );
      this.featuredStates.push('after');
      this.hiddenStates.push(false);
    });

    console.log(this.imageUrls);
  }

  nextImage() {
    const curIndex = this.selectedIndex;
    const nextIndex = curIndex + 1;
    if (nextIndex < this.imageUrls.length) {
      this.featuredStates[curIndex] = 'before';
      this.featuredStates[nextIndex] = 'featured';
      this.selectedIndex = nextIndex;
    }
  }

  previousImage() {
    const curIndex = this.selectedIndex;
    const prevIndex = curIndex - 1;
    if (prevIndex >= 0) {
      this.featuredStates[curIndex] = 'after';
      this.featuredStates[prevIndex] = 'featured';
      this.selectedIndex = prevIndex;
    }
  }

  selectIndex(index: number) {
    if (index >= 0 && index < this.imageUrls.length) {
      if (index > this.selectedIndex) {
        for (let i = this.selectedIndex; i < index; i++) {
          this.featuredStates[i] = 'before';
          if (index - i > 1) {
            this.hiddenStates[i] = true;
          }
        }
      }
      if (index < this.selectedIndex) {
        for (let i = this.selectedIndex; i > index; i--) {
          this.featuredStates[i] = 'after';
          if (i - index > 1) {
            this.hiddenStates[i] = true;
          }
        }
      }
      this.featuredStates[index] = 'featured';
      this.selectedIndex = index;

      setTimeout(() => {
        for (let i = 0; i < this.hiddenStates.length; i++) {
          this.hiddenStates[i] = false;
        }
      }, 401);
    }
  }
}
