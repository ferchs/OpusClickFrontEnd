import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit.component';

describe('UserDashboardProfileEditComponent', () => {
  let component: UserDashboardProfileEditComponent;
  let fixture: ComponentFixture<UserDashboardProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
