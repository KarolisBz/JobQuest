import { TestBed } from '@angular/core/testing';
import { JobHandlerService } from './job-handler.service';

describe('JobHandlerService', () => {
  let service: JobHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
