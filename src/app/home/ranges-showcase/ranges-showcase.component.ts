import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenSize } from 'src/app/services/layout.service';

import { LayoutService } from '../../services/layout.service';



interface RangePanelInfo {
  name: string;
  imageUrl: string;
  bgUrl: string;
}

@Component({
  selector: 'app-ranges-showcase',
  templateUrl: './ranges-showcase.component.html',
  styleUrls: ['./ranges-showcase.component.scss'],
  animations: [
    trigger('bgImage', [
      state('1', style({
        'background-image': `url("/assets/ranges/Range1.jpg")`
      })),
      state('2', style({
        'background-image': `url("/assets/ranges/Range2.jpg")`
      })),
      state('3', style({
        'background-image': `url("/assets/ranges/Range3.jpg")`
      })),
      state('4', style({
        'background-image': `url("/assets/ranges/Range4.jpg")`
      })),
      transition('* <=> *', [
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RangesShowcaseComponent implements OnInit, OnDestroy {

  currentIndex = '1';
  startedCarousel = false;
  cars = [1, 2, 3, 4];
  ranges: RangePanelInfo[] = [
    {
      name: 'Wild At Heart',
      imageUrl: '/assets/ranges/WAH.jpg',
      bgUrl: '/assets/ranges/Range1.jpg'
    },
    {
      name: 'Protea Collection',
      imageUrl: '/assets/ranges/PC.jpg',
      bgUrl: '/assets/ranges/Range2.jpg'
    },
    {
      name: 'Jungle Fever',
      imageUrl: '/assets/ranges/JF.jpg',
      bgUrl: '/assets/ranges/Range3.jpg',
    },
    {
      name: 'Classic',
      imageUrl: '/assets/ranges/CP.jpg',
      bgUrl: '/assets/ranges/Range4.jpg',
    }
  ];

  screenSize!: ScreenSize;
  screenSub!: Subscription;

  @ViewChild('container', { static: false }) container!: ElementRef;

  constructor(private renderer: Renderer2, private ls: LayoutService) { }
  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
  }

  ngOnInit(): void {
    this.screenSub = this.ls.screenSize$.subscribe(
      (next) => {
        this.screenSize = next;
      }
    );
  }

  onIntersection(event: IntersectionObserverEntry): void {
    console.log(event);
    console.log('startedCarousel: ', this.startedCarousel);
    if (event.isIntersecting && (!this.startedCarousel)) {
      this.startedCarousel = true;
    }
    console.log('startedCarousel: ', this.startedCarousel);
  }

  scroll(event: any): void {
    const index: number = event.page;
    this.renderer.setStyle(
      this.container.nativeElement,
      'background-image',
      `url(${this.ranges[index].bgUrl})`);
  }
}
