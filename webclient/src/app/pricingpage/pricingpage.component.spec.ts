import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingpageComponent } from './pricingpage.component';

describe('PricingpageComponent', () => {
  let component: PricingpageComponent;
  let fixture: ComponentFixture<PricingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
