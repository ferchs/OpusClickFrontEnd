import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderQuotationComponent } from './provider-quotation.component';

describe('ProviderQuotationComponent', () => {
  let component: ProviderQuotationComponent;
  let fixture: ComponentFixture<ProviderQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
