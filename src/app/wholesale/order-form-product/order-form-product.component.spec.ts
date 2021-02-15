import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormProductComponent } from './order-form-product.component';

describe('OrderFormProductComponent', () => {
  let component: OrderFormProductComponent;
  let fixture: ComponentFixture<OrderFormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFormProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
