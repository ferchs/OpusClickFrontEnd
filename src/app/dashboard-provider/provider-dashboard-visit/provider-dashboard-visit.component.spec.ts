import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardVisitComponent } from './provider-dashboard-visit.component';

describe('ProviderDashboardVisitComponent', () => {
  let component: ProviderDashboardVisitComponent;
  let fixture: ComponentFixture<ProviderDashboardVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
