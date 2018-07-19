import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlineQuoteComponent } from './user-online-quote.component';

describe('UserOnlineQuoteComponent', () => {
  let component: UserOnlineQuoteComponent;
  let fixture: ComponentFixture<UserOnlineQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOnlineQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOnlineQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
