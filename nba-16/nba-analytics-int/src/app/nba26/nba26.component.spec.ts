import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba26Component } from './nba26.component';

describe('Nba26Component', () => {
  let component: Nba26Component;
  let fixture: ComponentFixture<Nba26Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba26Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba26Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
