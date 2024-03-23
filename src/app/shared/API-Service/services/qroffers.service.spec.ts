import { TestBed } from '@angular/core/testing';

import { QroffersService } from './qroffers.service';

describe('QroffersService', () => {
  let service: QroffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QroffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
