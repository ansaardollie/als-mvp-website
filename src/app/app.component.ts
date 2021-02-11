import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'als-website';

  onHomePage = true;
  showCart = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((nextEvent) => {
      if (nextEvent instanceof NavigationEnd) {
        this.onHomePage = nextEvent.url == '/' || nextEvent.url == '/home';
        const onShopPage =
          nextEvent.url.indexOf('products') >= 0 &&
          nextEvent.url.indexOf('products/') < 0;
        this.showCart = onShopPage;
      }
    });
  }
}
