import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  title$: Observable<string>;
  constructor(private router: Router) {
    // console.log(this.route.snapshot.pathFromRoot);
    // console.log('Shop Component activated route', this.route.snapshot);
    this.title$ = this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      map((event) => event as ActivationEnd),
      map((event) => this.getTitle(event.snapshot))
    );
  }

  ngOnInit(): void {}

  getTitle(route: ActivatedRouteSnapshot): string {
    console.log(route);
    let title = 'Shop';

    // switch (page) {
    //   case 'products':
    //     title = 'Products';
    //     break;

    //   default:
    //     break;
    // }

    return title;
  }
}
