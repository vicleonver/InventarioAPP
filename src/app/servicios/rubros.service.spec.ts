import { TestBed, inject } from '@angular/core/testing';

import { RubrosService } from './rubros.service';

describe('RubrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubrosService]
    });
  });

  it('should be created', inject([RubrosService], (service: RubrosService) => {
    expect(service).toBeTruthy();
  }));
});
