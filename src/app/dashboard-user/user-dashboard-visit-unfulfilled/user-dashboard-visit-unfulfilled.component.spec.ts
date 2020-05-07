import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled.component';

describe('UserDashboardVisitUnfulfilledComponent', () => {
  let component: UserDashboardVisitUnfulfilledComponent;
  let fixture: ComponentFixture<UserDashboardVisitUnfulfilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardVisitUnfulfilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardVisitUnfulfilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
