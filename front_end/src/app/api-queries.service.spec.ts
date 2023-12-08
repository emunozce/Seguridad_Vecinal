import { TestBed } from '@angular/core/testing';

import { ApiQueriesService } from './api-queries.service';

describe('ApiQueriesService', () => {
  let service: ApiQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
