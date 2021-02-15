import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesaleLandingComponent } from './wholesale-landing.component';

describe('WholesaleLandingComponent', () => {
  let component: WholesaleLandingComponent;
  let fixture: ComponentFixture<WholesaleLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesaleLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesaleLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
