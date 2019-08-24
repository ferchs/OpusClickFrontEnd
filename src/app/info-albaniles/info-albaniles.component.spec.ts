import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAlbanilesComponent } from './info-albaniles.component';

describe('InfoAlbanilesComponent', () => {
  let component: InfoAlbanilesComponent;
  let fixture: ComponentFixture<InfoAlbanilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAlbanilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAlbanilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
