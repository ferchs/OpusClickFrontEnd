import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled.component';

describe('ProviderDashboardVisitUnfulfilledComponent', () => {
  let component: ProviderDashboardVisitUnfulfilledComponent;
  let fixture: ComponentFixture<ProviderDashboardVisitUnfulfilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardVisitUnfulfilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardVisitUnfulfilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
