import { TestBed } from '@angular/core/testing';

import { CrmintegrationService } from './crmintegration.service';

describe('CrmintegrationService', () => {
  let service: CrmintegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmintegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
