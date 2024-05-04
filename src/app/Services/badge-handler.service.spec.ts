import { TestBed } from '@angular/core/testing';

import { BadgeHandlerService } from './badge-handler.service';

describe('BadgeHandlerService', () => {
  let service: BadgeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadgeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
