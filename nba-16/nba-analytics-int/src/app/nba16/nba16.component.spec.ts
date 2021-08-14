import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba16Component } from './nba16.component';

describe('Nba16Component', () => {
  let component: Nba16Component;
  let fixture: ComponentFixture<Nba16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
