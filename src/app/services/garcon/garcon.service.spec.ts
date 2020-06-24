import { TestBed } from '@angular/core/testing';

import { GarconService } from './garcon.service';

describe('GarconService', () => {
  let service: GarconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
