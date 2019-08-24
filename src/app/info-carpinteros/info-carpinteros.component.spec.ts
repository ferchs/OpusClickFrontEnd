import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarpinterosComponent } from './info-carpinteros.component';

describe('InfoCarpinterosComponent', () => {
  let component: InfoCarpinterosComponent;
  let fixture: ComponentFixture<InfoCarpinterosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCarpinterosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCarpinterosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
