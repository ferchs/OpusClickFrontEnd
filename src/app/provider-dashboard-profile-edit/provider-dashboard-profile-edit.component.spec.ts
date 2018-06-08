import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit.component';

describe('ProviderDashboardProfileEditComponent', () => {
  let component: ProviderDashboardProfileEditComponent;
  let fixture: ComponentFixture<ProviderDashboardProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDashboardProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDashboardProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
