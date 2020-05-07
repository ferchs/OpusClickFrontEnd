import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlomerosComponent } from './info-plomeros.component';

describe('InfoPlomerosComponent', () => {
  let component: InfoPlomerosComponent;
  let fixture: ComponentFixture<InfoPlomerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPlomerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPlomerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
