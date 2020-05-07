import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardProfileComponent } from './provider-dashboard-profile.component';

describe('ProviderDashboardProfileComponent', () => {
  let component: ProviderDashboardProfileComponent;
  let fixture: ComponentFixture<ProviderDashboardProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
