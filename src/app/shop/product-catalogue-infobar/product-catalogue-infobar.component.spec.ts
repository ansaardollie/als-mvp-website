import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogueInfobarComponent } from './product-catalogue-infobar.component';

describe('ProductCatalogueInfobarComponent', () => {
  let component: ProductCatalogueInfobarComponent;
  let fixture: ComponentFixture<ProductCatalogueInfobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCatalogueInfobarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogueInfobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
