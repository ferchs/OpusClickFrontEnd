import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardQuotationComponent } from './user-dashboard-quotation.component';

describe('UserDashboardQuotationComponent', () => {
  let component: UserDashboardQuotationComponent;
  let fixture: ComponentFixture<UserDashboardQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
