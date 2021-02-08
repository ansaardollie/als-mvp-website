import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface ScreenSize {
  extraSmall : boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements OnDestroy {

  screenSize$ = new BehaviorSubject<ScreenSize>({
    extraSmall: false,
    small: false,
    medium: false,
    large: true
  });

  breakpointSub: Subscription;



  constructor(private bo: BreakpointObserver) {
    this.breakpointSub = this.bo.observe([
      MediaQueries.extraSmall,
      MediaQueries.small,
      MediaQueries.medium,
      MediaQueries.large
    ]).subscribe(
      (bp) => {
        const xs = bp.breakpoints[MediaQueries.extraSmall];
        const s = bp.breakpoints[MediaQueries.small];
        const m = bp.breakpoints[MediaQueries.medium];
        const l = bp.breakpoints[MediaQueries.large];
        const screen: ScreenSize = {
          extraSmall: xs,
          small: s,
          medium: m,
          large: l
        };

        this.screenSize$.next(screen);
      }
    );
  }
  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}

export enum MediaQueries {
  extraSmall = '(max-width: 599px)',
  small = '(min-width: 600px) and (max-width: 899px)',
  medium = '(min-width: 900px) and (max-width: 1199px)',
  large = '(min-width: 1200px)'
}
