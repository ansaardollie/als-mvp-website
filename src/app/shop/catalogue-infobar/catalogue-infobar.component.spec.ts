import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueInfobarComponent } from './catalogue-infobar.component';

describe('CatalogueInfobarComponent', () => {
  let component: CatalogueInfobarComponent;
  let fixture: ComponentFixture<CatalogueInfobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueInfobarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueInfobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
