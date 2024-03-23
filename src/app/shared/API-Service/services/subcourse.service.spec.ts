import { TestBed } from '@angular/core/testing';

import { SubcourseService } from './subcourse.service';

describe('SubcourseService', () => {
  let service: SubcourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
