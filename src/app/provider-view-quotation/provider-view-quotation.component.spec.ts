import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderViewQuotationComponent } from './provider-view-quotation.component';

describe('ProviderViewQuotationComponent', () => {
  let component: ProviderViewQuotationComponent;
  let fixture: ComponentFixture<ProviderViewQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderViewQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderViewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
