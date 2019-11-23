// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { MatDialog, MatInput } from '@angular/material';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../../services/login.service';
import { UserDetailService } from '../../services/userDetails.service';
import { Store, State } from '@ngrx/store';

import { Component, Directive } from '@angular/core';
import { HeaderComponent } from './header.component';
import { UiService } from '../../../shared/ui-service.service';
import { of, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';

@Injectable()
class MockMatDialog { }

@Injectable()
class MockAuthService {
    signIn(val) {
        return new Promise((resolve, reject) => {
            if (val == 'google') {


                let obj = {
                    id: "id",
                    name: "name",
                    email: "email",
                    image: "image",
                    token: "token",
                    role: "role"
                }
                resolve(obj);
            } else {
                reject('Other the Google login is not supported');
            }
        });
    };
    signOut() {
        return new Promise((resolve, reject) => {
            let obj = {
                id: "id",
                name: "name",
                email: "email",
                image: "image",
                token: "token",
                role: "role"
            }
            resolve(obj);
        });
};
}

@Injectable()
class MockLoginService {
    getUserData() {
        return Observable.create((observer: Observer<{ name: string, users: Array<{ uid: string, preferences: {}, ratings: {} }> }>) => {
            observer.next({
                name: 'User',
                users: [{ 'uid': "id", 'preferences': {}, ratings: {} }, { 'uid': "uid", 'preferences': {}, ratings: {} }]
            });
            return observer;
        })
    }
}
@Injectable()
class StoreMock {
    // How we did it before
    select = jasmine.createSpy().and.returnValue(of('quote'));
    dispatch = jasmine.createSpy();
}

class MockRouter {
    navigate(path) { }
}

@Injectable()
class MockUserDetailService {
    addNewUser(userData) { }
}

@Injectable()


@Injectable()


@Injectable()
class MockUiService { }

describe('HeaderComponent', () => {
    let fixture;
    let component;
    let userService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule],
            declarations: [
                HeaderComponent
            ],
            providers: [
                { provide: MatDialog, useClass: MockMatDialog },
                { provide: AuthService, useClass: MockAuthService },
                { provide: LoginService, useClass: MockLoginService },
                { provide: UserDetailService, useClass: MockUserDetailService },
                { provide: Router, useClass: MockRouter },
                { provide: Store, useClass: StoreMock },
                { provide: UiService, useClass: MockUiService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.debugElement.componentInstance;
        userService = new MockAuthService();
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #socialSignIn() for google', async () => {
        let socialPlatform = 'google';
        const result = component.socialSignIn(socialPlatform);
    });
    it('should run #socialSignIn() for  other', async () => {
        let socialPlatform = 'other';
        const result = component.socialSignIn(socialPlatform);
    });

    it('should run #socialSignOut()', async () => {
        let socialPlatform = 'google';
        const result = component.socialSignOut(socialPlatform);
    });

    it('should run #loadProfile()', async () => {
        const result = component.loadProfile();
    });

    it('should run #validate()', async () => {
        const result = component.validate();
    });

    it('should run #ngOnInit()', async () => {
        const result = component.ngOnInit();
    });

    it('should run #openSearchPage()', async () => {
        component.openSearchPage();
    });

});