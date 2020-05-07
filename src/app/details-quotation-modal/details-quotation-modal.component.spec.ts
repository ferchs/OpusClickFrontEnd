import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuotationModalComponent } from './details-quotation-modal.component';

describe('DetailsQuotationModalComponent', () => {
  let component: DetailsQuotationModalComponent;
  let fixture: ComponentFixture<DetailsQuotationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsQuotationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
