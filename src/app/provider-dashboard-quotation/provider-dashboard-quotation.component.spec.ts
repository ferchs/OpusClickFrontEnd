import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardQuotationComponent } from './provider-dashboard-quotation.component';

describe('ProviderDashboardQuotationComponent', () => {
  let component: ProviderDashboardQuotationComponent;
  let fixture: ComponentFixture<ProviderDashboardQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
