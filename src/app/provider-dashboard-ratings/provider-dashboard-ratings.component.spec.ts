import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardRatingsComponent } from './provider-dashboard-ratings.component';

describe('ProviderDashboardRatingsComponent', () => {
  let component: ProviderDashboardRatingsComponent;
  let fixture: ComponentFixture<ProviderDashboardRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
