import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardVisitPendingComponent } from './provider-dashboard-visit-pending.component';

describe('ProviderDashboardVisitPendingComponent', () => {
  let component: ProviderDashboardVisitPendingComponent;
  let fixture: ComponentFixture<ProviderDashboardVisitPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardVisitPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardVisitPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
