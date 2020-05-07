import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestPaymentComponent } from './provider-request-payment.component';

describe('ProviderRequestPaymentComponent', () => {
  let component: ProviderRequestPaymentComponent;
  let fixture: ComponentFixture<ProviderRequestPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRequestPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRequestPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
