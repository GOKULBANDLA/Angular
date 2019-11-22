import { async } from '@angular/core/testing';
import { AdminguardService } from './adminguard.service';
import { Store, State } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LogService } from 'src/app/shared/Services/Global/log.service';

@Injectable()
class MockRouter {
  navigate(path) {}
}
@Injectable()
class StoreMock {
  // How we did it before
  select = jasmine.createSpy().and.returnValue(of('quote'));
  dispatch = jasmine.createSpy();
}
@Injectable()
class LoggerMock {
  // How we did it before
  log() {}
  info() {}
  error() {}
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AdminguardService;
    let authService;
    let router;
    let state;
    let logger;

    it('should return false for a not logged in user', () => {
      authService = { isLoggedIn: () => true };
      router = new MockRouter();
      state = new StoreMock();
      logger = new LoggerMock();
      authGuard = new AdminguardService(logger, router, state);

      expect(authGuard.canActivate(router, state)).toEqual(false);
    });
  });
});
