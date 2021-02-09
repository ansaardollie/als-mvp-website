import { Component, OnInit } from '@angular/core';

interface Cart {
  numItems: number;
  total: number;
}

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.scss'],
})
export class CartOverlayComponent implements OnInit {
  currentCart: Cart = {
    numItems: 2500,
    total: 150000,
  };

  constructor() {}

  ngOnInit() {}
}
