import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentSummaryComponent } from './user-payment-summary.component';

describe('UserPaymentSummaryComponent', () => {
  let component: UserPaymentSummaryComponent;
  let fixture: ComponentFixture<UserPaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPaymentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
