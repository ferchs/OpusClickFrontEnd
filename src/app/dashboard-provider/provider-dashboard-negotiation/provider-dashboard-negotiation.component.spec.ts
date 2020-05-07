import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardNegotiationComponent } from './provider-dashboard-negotiation.component';

describe('ProviderDashboardNegotiationComponent', () => {
  let component: ProviderDashboardNegotiationComponent;
  let fixture: ComponentFixture<ProviderDashboardNegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardNegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
