import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardVisitAcceptedComponent } from './provider-dashboard-visit-accepted.component';

describe('ProviderDashboardVisitAcceptedComponent', () => {
  let component: ProviderDashboardVisitAcceptedComponent;
  let fixture: ComponentFixture<ProviderDashboardVisitAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardVisitAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardVisitAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
