import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba17Component } from './nba17.component';

describe('Nba17Component', () => {
  let component: Nba17Component;
  let fixture: ComponentFixture<Nba17Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
