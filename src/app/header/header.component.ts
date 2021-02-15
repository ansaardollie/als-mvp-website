import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

import { LayoutService, ScreenSize } from '../services/layout.service';
import { UserService } from './../services/user.service';

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

  subsink = new SubSink();

  sidebarVisible = false;
  gottenHeight = false;

  @ViewChild('logo', { static: false }) logo!: ElementRef;
  @ViewChild('stickyNav', { static: false }) nav!: ElementRef;
  @ViewChild('mobileNav', { static: false }) mobileNav!: ElementRef;

  constructor(private ss: LayoutService, private us: UserService) {}
  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
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
            routerLink: '/shop/products',
            queryParamsHandling: 'merge',
            queryParams: {
              design: null,
              category: null,
              range: null,
              sale: null,
              min: null,
              max: null,
            },
            command: this.closeSidebar.bind(this),
          },
          {
            separator: true,
          },
          {
            label: 'Shop By Category',
            routerLink: '/shop/categories',
            command: this.closeSidebar.bind(this),
          },
          {
            label: 'Shop By Design Range',
            routerLink: '/shop/ranges',
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
        items: [
          {
            label: 'Login',
            routerLink: '/user/login',
          },
          {
            label: 'Register',
          },
        ],
      },
      {
        label: 'FAQ',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'Contact',
        command: this.closeSidebar.bind(this),
      },
      {
        label: 'Account',
        items: [
          {
            label: 'Login',
          },
          {
            label: 'Register',
          },
        ],
      },
    ];

    this.subsink.add(
      this.ss.screenSize$.subscribe((next) => {
        this.screenSize = next;
      })
    );

    this.subsink.add(
      this.us.user.subscribe((user) => {
        if (!!user) {
          this.mainMenuItems[6] = {
            label: 'My Account',
            items: [
              {
                label: user.email,
              },
              {
                label: user.password,
              },
              {
                label: user.isWholesaleClient ? 'Wholesale' : 'Retail',
              },
            ],
          };
          if (user.isWholesaleClient) {
            this.mainMenuItems[3].items = [
              {
                label: 'Place New Order',
                routerLink: '/wholesale/order',
              },
              {
                label: 'View Current Orders',
              },
            ];
          } else {
            this.mainMenuItems[3].items = [
              {
                label: 'Login',
                routerLink: '/user/login',
              },
              {
                label: 'Register',
              },
            ];
          }
        }
      })
    );
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }
}
