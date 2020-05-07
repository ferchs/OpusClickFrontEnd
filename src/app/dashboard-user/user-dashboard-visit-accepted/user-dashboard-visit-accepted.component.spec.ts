import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardVisitAcceptedComponent } from './user-dashboard-visit-accepted.component';

describe('UserDashboardVisitAcceptedComponent', () => {
  let component: UserDashboardVisitAcceptedComponent;
  let fixture: ComponentFixture<UserDashboardVisitAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardVisitAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardVisitAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
