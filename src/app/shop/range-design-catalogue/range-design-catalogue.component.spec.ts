import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDesignCatalogueComponent } from './range-design-catalogue.component';

describe('RangeDesignCatalogueComponent', () => {
  let component: RangeDesignCatalogueComponent;
  let fixture: ComponentFixture<RangeDesignCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeDesignCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDesignCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
