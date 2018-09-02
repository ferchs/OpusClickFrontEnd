import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovePaymentComponent } from './user-approve-payment.component';

describe('UserApprovePaymentComponent', () => {
  let component: UserApprovePaymentComponent;
  let fixture: ComponentFixture<UserApprovePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApprovePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApprovePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
