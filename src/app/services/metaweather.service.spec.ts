import { TestBed, inject } from '@angular/core/testing';

import { MetaweatherService } from './metaweather.service';

describe('MetaweatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetaweatherService]
    });
  });

  it('should be created', inject([MetaweatherService], (service: MetaweatherService) => {
    expect(service).toBeTruthy();
  }));
});
