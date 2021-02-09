import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Subscription } from 'rxjs';

import { LayoutService, ScreenSize } from '../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  mainMenuItems: MenuItem[] = [];

  menuPosition: any;
  menuHeight: any;
  sticky: boolean = false;
  screenSize!: ScreenSize;
  screenSub!: Subscription;

  sidebarVisible = false;
  gottenHeight = false;

  @ViewChild('logo', { static: false }) logo!: ElementRef;
  @ViewChild('stickyNav', { static: false }) nav!: ElementRef;
  @ViewChild('mobileNav', { static: false }) mobileNav!: ElementRef;

  constructor(private ss: LayoutService) {}
  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
      // console.log("MOVED PAST")
    } else {
      this.sticky = false;
    }
  }

  inView(event: IntersectionObserverEntry, element: HTMLElement): void {
    if (!this.sticky && !this.screenSize.extraSmall) {
      this.menuPosition = element.offsetTop;
    }
  }

  ngOnInit(): void {
    this.mainMenuItems = [
      {
        label: 'Home',
        routerLink: '/home',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'Shop',
        items: [
          {
            label: 'Shop All Products',
            command: this.closeSidebar.bind(this),
          },
          {
            separator: true,
          },
          {
            label: 'Shop By Product Type',
            routerLink: '/shop/categories',
            command: this.closeSidebar.bind(this),
          },
          {
            label: 'Shop By Design Range',
            command: this.closeSidebar.bind(this),
          },
        ],
      },
      {
        label: 'About Us',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'Wholesale',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'FAQ',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'Contact',
        command: this.closeSidebar.bind(this),
      },
    ];

    this.screenSub = this.ss.screenSize$.subscribe((next) => {
      this.screenSize = next;
    });
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }
}
