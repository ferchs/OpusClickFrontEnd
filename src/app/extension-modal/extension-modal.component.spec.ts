import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionModalComponent } from './extension-modal.component';

describe('ExtensionModalComponent', () => {
  let component: ExtensionModalComponent;
  let fixture: ComponentFixture<ExtensionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
