import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from './../../../models/product.model';
import { ProductService } from './../../../services/product.service';

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
export class ProductImageGalleryComponent implements OnInit, OnChanges {
  @Input() product!: Product;
  @Output() doneLoading: EventEmitter<boolean> = new EventEmitter();
  @Input() smallerSize: boolean = false;
  imageUrls: string[] = [];
  thumbnailUrls: string[] = [];
  hasLoadedUrls: boolean = false;
  selectedIndex: number = 0;
  featuredStates: string[] = [];
  hiddenStates: boolean[] = [];
  imageLoadingStates: boolean[] = [];
  thumbnailLoadingStates: boolean[] = [];

  constructor(private ps: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.hasLoadedUrls) {
      this.loadUrls();
      this.hasLoadedUrls = true;
    }
    const qty = this.imageUrls.length;

    for (let i = 0; i < qty; i++) {
      this.featuredStates.push(i == 0 ? 'featured' : 'after');
      this.hiddenStates.push(false);
      this.imageLoadingStates.push(false);
      this.thumbnailLoadingStates.push(false);
      this.doneLoading.next(false);
    }
  }

  loadUrls(): void {
    const mainUrls: string[] = [];
    const thumbUrls: string[] = [];
    mainUrls.push(
      `${environment.cloudinary.productGalleryImageUrl}/products/${this.product.id}.jpg`
    );
    thumbUrls.push(
      `${environment.cloudinary.galleryThumbnailImageUrl}/products/${this.product.id}.jpg`
    );

    this.product.lifestyleImageIDs?.forEach((lpID) => {
      mainUrls.push(
        `${environment.cloudinary.productGalleryImageUrl}/lifestyle/${lpID}.jpg`
      );
      thumbUrls.push(
        `${environment.cloudinary.galleryThumbnailImageUrl}/lifestyle/${lpID}.jpg`
      );
    });

    this.imageUrls = mainUrls;
    this.thumbnailUrls = thumbUrls;
  }

  ngOnInit(): void {}

  nextImage() {
    const curIndex = this.selectedIndex;
    const nextIndex = curIndex + 1;
    if (nextIndex < this.imageUrls.length) {
      this.featuredStates[curIndex] = 'before';
      this.featuredStates[nextIndex] = 'featured';
      this.selectedIndex = nextIndex;
    }
  }

  get doneLoadingImages() {
    for (let state of this.imageLoadingStates) {
      if (!state) return false;
    }
    return true;
  }

  get doneLoadingThumbnails() {
    for (let state of this.thumbnailLoadingStates) {
      if (!state) return false;
    }
    return true;
  }

  loadImage(index: number) {
    this.imageLoadingStates[index] = true;
    this.checkLoadingStates();
  }

  loadThumbnail(index: number) {
    this.thumbnailLoadingStates[index] = true;
    this.checkLoadingStates();
  }

  checkLoadingStates() {
    if (this.doneLoadingImages && this.doneLoadingThumbnails) {
      this.doneLoading.next(true);
    } else {
      this.doneLoading.next(false);
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
        }
      }
      if (index < this.selectedIndex) {
        for (let i = this.selectedIndex; i > index; i--) {
          this.featuredStates[i] = 'after';
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
