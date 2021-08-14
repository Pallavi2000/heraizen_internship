import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricsPopupComponent } from './rubrics-popup.component';

describe('RubricsPopupComponent', () => {
  let component: RubricsPopupComponent;
  let fixture: ComponentFixture<RubricsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubricsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
