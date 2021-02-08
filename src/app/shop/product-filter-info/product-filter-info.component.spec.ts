import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterInfoComponent } from './product-filter-info.component';

describe('ProductFilterInfoComponent', () => {
  let component: ProductFilterInfoComponent;
  let fixture: ComponentFixture<ProductFilterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
