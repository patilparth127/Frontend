import { TestBed } from '@angular/core/testing';

import { CommanInterceptor } from './comman.interceptor';

describe('CommanInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommanInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommanInterceptor = TestBed.inject(CommanInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
