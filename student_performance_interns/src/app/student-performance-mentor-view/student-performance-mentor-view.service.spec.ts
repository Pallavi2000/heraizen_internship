import { TestBed } from '@angular/core/testing';

import { StudentPerformanceMentorViewService } from './student-performance-mentor-view.service';

describe('StudentPerformanceMentorViewService', () => {
  let service: StudentPerformanceMentorViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPerformanceMentorViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
