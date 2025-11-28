import { TestBed } from '@angular/core/testing';

import { ServicePdf } from './service.pdf';

describe('ServicePdf', () => {
  let service: ServicePdf;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePdf);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
