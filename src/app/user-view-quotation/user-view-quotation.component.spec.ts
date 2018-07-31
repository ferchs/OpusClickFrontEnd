import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewQuotationComponent } from './user-view-quotation.component';

describe('UserViewQuotationComponent', () => {
  let component: UserViewQuotationComponent;
  let fixture: ComponentFixture<UserViewQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
