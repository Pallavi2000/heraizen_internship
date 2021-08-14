import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba27aComponent } from './nba27a.component';

describe('Nba27aComponent', () => {
  let component: Nba27aComponent;
  let fixture: ComponentFixture<Nba27aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba27aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba27aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
