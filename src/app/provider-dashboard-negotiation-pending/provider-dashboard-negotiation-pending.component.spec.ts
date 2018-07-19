import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardNegotiationPendingComponent } from './provider-dashboard-negotiation-pending.component';

describe('ProviderDashboardNegotiationPendingComponent', () => {
  let component: ProviderDashboardNegotiationPendingComponent;
  let fixture: ComponentFixture<ProviderDashboardNegotiationPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardNegotiationPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardNegotiationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
