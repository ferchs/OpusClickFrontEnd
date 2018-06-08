import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardMenuComponent } from './provider-dashboard-menu.component';

describe('ProviderDashboardMenuComponent', () => {
  let component: ProviderDashboardMenuComponent;
  let fixture: ComponentFixture<ProviderDashboardMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
