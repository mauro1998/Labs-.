import { TestBed } from '@angular/core/testing';

import { PpaAngularSharedService } from './ppa-angular-shared.service';

describe('PpaAngularSharedService', () => {
  let service: PpaAngularSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpaAngularSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
