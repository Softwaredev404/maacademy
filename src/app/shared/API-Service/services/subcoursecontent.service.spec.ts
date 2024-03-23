import { TestBed } from '@angular/core/testing';

import { SubcoursecontentService } from './subcoursecontent.service';

describe('SubcoursecontentService', () => {
  let service: SubcoursecontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcoursecontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
