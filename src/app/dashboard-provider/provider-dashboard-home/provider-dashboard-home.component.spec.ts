import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardHomeComponent } from './provider-dashboard-home.component';

describe('ProviderDashboardHomeComponent', () => {
  let component: ProviderDashboardHomeComponent;
  let fixture: ComponentFixture<ProviderDashboardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
