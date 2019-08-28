import { TestBed } from '@angular/core/testing';

import { GuarAuthService } from './guar-auth.service';

describe('GuarAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuarAuthService = TestBed.get(GuarAuthService);
    expect(service).toBeTruthy();
  });
});
