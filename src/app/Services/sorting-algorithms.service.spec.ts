import { TestBed } from '@angular/core/testing';

import { SortingAlgorithmsService } from './sorting-algorithms.service';

describe('SortingAlgorithmsService', () => {
  let service: SortingAlgorithmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingAlgorithmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
