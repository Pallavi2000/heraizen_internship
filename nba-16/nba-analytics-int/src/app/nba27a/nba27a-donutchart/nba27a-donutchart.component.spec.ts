import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba27aDonutchartComponent } from './nba27a-donutchart.component';

describe('Nba27aDonutchartComponent', () => {
  let component: Nba27aDonutchartComponent;
  let fixture: ComponentFixture<Nba27aDonutchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba27aDonutchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba27aDonutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
