import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVisitModalComponent } from './details-visit-modal.component';

describe('DetailsVisitModalComponent', () => {
  let component: DetailsVisitModalComponent;
  let fixture: ComponentFixture<DetailsVisitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVisitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
