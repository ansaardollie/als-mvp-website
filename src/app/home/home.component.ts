import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LayoutService, ScreenSize } from '../services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  screenSize!: ScreenSize;
  screenSub!: Subscription;

  constructor(private ls: LayoutService) { }

  ngOnInit() {
    this.screenSub = this.ls.screenSize$.subscribe(
      (next) => {
        this.screenSize = next;
      }
    );
  }

  ngOnDestroy(): void {
    this.screenSub.unsubscribe();
  }
}
