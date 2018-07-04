import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardVisitPendingComponent } from './user-dashboard-visit-pending.component';

describe('UserDashboardVisitPendingComponent', () => {
  let component: UserDashboardVisitPendingComponent;
  let fixture: ComponentFixture<UserDashboardVisitPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardVisitPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardVisitPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
