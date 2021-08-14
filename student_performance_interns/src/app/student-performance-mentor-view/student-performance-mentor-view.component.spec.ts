import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPerformanceMentorViewComponent } from './student-performance-mentor-view.component';

describe('StudentPerformanceMentorViewComponent', () => {
  let component: StudentPerformanceMentorViewComponent;
  let fixture: ComponentFixture<StudentPerformanceMentorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPerformanceMentorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPerformanceMentorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
