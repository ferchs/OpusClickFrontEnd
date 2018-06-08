import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardVisitComponent } from './user-dashboard-visit.component';

describe('UserDashboardVisitComponent', () => {
  let component: UserDashboardVisitComponent;
  let fixture: ComponentFixture<UserDashboardVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
