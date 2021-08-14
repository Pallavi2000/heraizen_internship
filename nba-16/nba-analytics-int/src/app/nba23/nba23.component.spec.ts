import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba23Component } from './nba23.component';

describe('Nba23Component', () => {
  let component: Nba23Component;
  let fixture: ComponentFixture<Nba23Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba23Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
