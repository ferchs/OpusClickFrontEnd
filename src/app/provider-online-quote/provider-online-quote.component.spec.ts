import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOnlineQuoteComponent } from './provider-online-quote.component';

describe('ProviderOnlineQuoteComponent', () => {
  let component: ProviderOnlineQuoteComponent;
  let fixture: ComponentFixture<ProviderOnlineQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderOnlineQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOnlineQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
