import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryInfo } from 'src/app/models/product.model';

import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-category-catalogue',
  templateUrl: './category-catalogue.component.html',
  styleUrls: ['./category-catalogue.component.scss'],
})
export class CategoryCatalogueComponent implements OnInit {
  categories: CategoryInfo[] = [];
  umbrellaName: string = 'root';
  umbrellaID: string = 'root';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CategoryService
  ) {}

  ngOnInit(): void {
    // console.log('Resolved data');
    // console.log(this.route.snapshot.data);
    this.route.data.subscribe((next) => {
      if (next.categories.length == 0) {
        const id = this.route.snapshot.params.id;
        this.router.navigate(['/shop', 'products'], {
          queryParams: {
            category: id,
          },
        });
      } else {
        this.categories = next.categories;
      }
    });

    this.route.params.subscribe((params) => {
      if (params.id == '') {
        this.umbrellaName = 'root';
      } else {
        this.umbrellaID = params.id;
        this.umbrellaName = this.cs.getNameByID(this.umbrellaID);
      }
    });
  }

  get catchAllLabel() {
    if (this.umbrellaName == 'root') return 'View All Products';
    else return `View All ${this.umbrellaName}`;
  }

  get catchAllQueryParams() {
    if (this.umbrellaName == 'root') return undefined;
    else
      return {
        category: this.umbrellaID,
      };
  }
}
