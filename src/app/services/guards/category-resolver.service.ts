import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryInfo } from 'src/app/models/product.model';

import { CategoryService } from '../category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolverService implements Resolve<CategoryInfo[]> {
  constructor(private cs: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CategoryInfo[] | Observable<CategoryInfo[]> | Promise<CategoryInfo[]> {
    const id = route.params.id;
    console.log('Running resolver');
    let obs: Observable<CategoryInfo[]>;
    if (id == '') {
      obs = this.cs.childCategories('root');
    } else {
      obs = this.cs.childCategories(id);
    }
    return obs.pipe(take(1));
  }
}
