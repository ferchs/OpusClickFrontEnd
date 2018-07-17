import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardNegotiationConcretedComponent } from './provider-dashboard-negotiation-concreted.component';

describe('ProviderDashboardNegotiationConcretedComponent', () => {
  let component: ProviderDashboardNegotiationConcretedComponent;
  let fixture: ComponentFixture<ProviderDashboardNegotiationConcretedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardNegotiationConcretedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardNegotiationConcretedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
