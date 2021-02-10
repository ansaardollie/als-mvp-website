import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RangeService } from './../range.service';

@Injectable({
  providedIn: 'root',
})
export class RangeResolverService implements Resolve<string[]> {
  constructor(private rs: RangeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string[] | Observable<string[]> | Promise<string[]> {
    return this.rs.designsWithPhotos;
  }
}
