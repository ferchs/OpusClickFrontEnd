import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOnlineQuoteModalComponent } from './details-online-quote-modal.component';

describe('DetailsOnlineQuoteModalComponent', () => {
  let component: DetailsOnlineQuoteModalComponent;
  let fixture: ComponentFixture<DetailsOnlineQuoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOnlineQuoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOnlineQuoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
