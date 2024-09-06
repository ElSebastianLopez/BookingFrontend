/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuxiliarService } from './auxiliar.service';

describe('Service: Auxiliar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuxiliarService]
    });
  });

  it('should ...', inject([AuxiliarService], (service: AuxiliarService) => {
    expect(service).toBeTruthy();
  }));
});
