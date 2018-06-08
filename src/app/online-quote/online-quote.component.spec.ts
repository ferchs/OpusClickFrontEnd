import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineQuoteComponent } from './online-quote.component';

describe('OnlineQuoteComponent', () => {
  let component: OnlineQuoteComponent;
  let fixture: ComponentFixture<OnlineQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
