import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoScoresComponent } from './co-scores.component';

describe('CoScoresComponent', () => {
  let component: CoScoresComponent;
  let fixture: ComponentFixture<CoScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
