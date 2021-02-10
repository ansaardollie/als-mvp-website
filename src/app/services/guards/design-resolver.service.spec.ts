import { TestBed } from '@angular/core/testing';

import { DesignResolverService } from './design-resolver.service';

describe('DesignResolverService', () => {
  let service: DesignResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
