import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWorkModalComponent } from './details-work-modal.component';

describe('DetailsWorkModalComponent', () => {
  let component: DetailsWorkModalComponent;
  let fixture: ComponentFixture<DetailsWorkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWorkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
