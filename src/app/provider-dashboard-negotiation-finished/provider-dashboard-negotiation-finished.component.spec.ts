import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardNegotiationFinishedComponent } from './provider-dashboard-negotiation-finished.component';

describe('ProviderDashboardNegotiationFinishedComponent', () => {
  let component: ProviderDashboardNegotiationFinishedComponent;
  let fixture: ComponentFixture<ProviderDashboardNegotiationFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardNegotiationFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardNegotiationFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
