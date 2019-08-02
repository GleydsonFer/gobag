import { TestBed } from '@angular/core/testing';

import { DevolucaoService } from './devolucao.service';

describe('DevolucaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevolucaoService = TestBed.get(DevolucaoService);
    expect(service).toBeTruthy();
  });
});
