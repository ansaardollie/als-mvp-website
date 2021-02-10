import { TestBed } from '@angular/core/testing';

import { RangeResolverService } from './range-resolver.service';

describe('RangeResolverService', () => {
  let service: RangeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
