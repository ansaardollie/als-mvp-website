import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DesignService } from './../design.service';

@Injectable({
  providedIn: 'root'
})
export class DesignResolverService implements Resolve<string[]> {

  constructor(private ds: DesignService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string[] | Observable<string[]> | Promise<string[]> {
    return this.ds.designsWithPhotos;
  }

  
}
