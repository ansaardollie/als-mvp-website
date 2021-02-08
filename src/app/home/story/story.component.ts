import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LayoutService, ScreenSize } from '../../services/layout.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {

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
