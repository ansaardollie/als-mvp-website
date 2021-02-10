import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCatalogueComponent } from './range-catalogue.component';

describe('RangeCatalogueComponent', () => {
  let component: RangeCatalogueComponent;
  let fixture: ComponentFixture<RangeCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
