import { TestBed } from '@angular/core/testing';

import { ApiProductService } from './api-product.service';

describe('ApiProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiProductService = TestBed.get(ApiProductService);
    expect(service).toBeTruthy();
  });
});
