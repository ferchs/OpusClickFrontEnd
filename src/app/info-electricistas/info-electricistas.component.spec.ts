import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoElectricistasComponent } from './info-electricistas.component';

describe('InfoElectricistasComponent', () => {
  let component: InfoElectricistasComponent;
  let fixture: ComponentFixture<InfoElectricistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoElectricistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoElectricistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
