import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  constructor(private scroller: ViewportScroller) {}
  ngAfterViewInit(): void {
    this.scroller.scrollToPosition([0, 90]);
  }

  ngOnInit(): void {}

  get imageURL(): string {
    return environment.cloudinary.loginPageImageUrl;
  }
}
