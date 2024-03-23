import { TestBed } from '@angular/core/testing';

import { ActivatedStudentsService } from './activated-students.service';

describe('ActivatedStudentsService', () => {
  let service: ActivatedStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivatedStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
