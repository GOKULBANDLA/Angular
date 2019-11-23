import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { Component, Directive } from '@angular/core';
import { AddTheaterComponent } from './add-theater.component';
import { MatDialog } from '@angular/material';


describe('AddTheaterComponent', () => {
    let fixture;
    let component;
    let submitEl: DebugElement;
    let okEl: DebugElement;

    beforeEach(() => {
        const matDialogStub = { open: () => ({}),
    closeAll:()=>{} };
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule],
            declarations: [
                AddTheaterComponent
            ],
            providers: [
                { provide: MatDialog, useValue: matDialogStub },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(AddTheaterComponent);
        component = fixture.debugElement.componentInstance;
        submitEl = fixture.debugElement.query(By.css('button'));
        
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run #ngOnInit()', async () => {
        spyOn(component, 'ngOnInit');
        const result = component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should run #onSubmit() for invaild form', async () => {
        //checking for Tid to be falsy
        let tid = component.newTheater.controls['tid'];
        expect(tid.valid).toBeFalsy();

        //checking for name to be falsy
        let name = component.newTheater.controls['name'];
        expect(name.valid).toBeFalsy();

        //checking for city to be falsy
        let city = component.newTheater.controls['city'];
        expect(city.valid).toBeFalsy();

        //checking for gLocation to be falsy
        let gLocation = component.newTheater.controls['gLocation'];
        expect(gLocation.valid).toBeFalsy();

        //checking for capacity to be falsy
        let capacity = component.newTheater.controls['capacity'];
        expect(capacity.valid).toBeFalsy();

        const result = component.onSubmit();
    });

    it('should run #onSubmit() for valid form', async () => {
        let theater;
        component.newTheater.controls['tid'].setValue('tid');

        component.newTheater.controls['name'].setValue('name');


        component.newTheater.controls['city'].setValue('city');


        component.newTheater.controls['gLocation'].setValue('gLocation');

        component.newTheater.controls['capacity'].setValue('capacity');
        component.addTheater.subscribe((value) => theater = value);
        submitEl.triggerEventHandler('click', null);

        const result = component.onSubmit();
        expect(theater.tid).toBe("tid");
        expect(theater.name).toBe("name");

    });

    it('should run #dialogOk()', async () => {
        const result = component.dialogOk();
        spyOn(TestBed.get(MatDialog), 'closeAll').and.callThrough();

    });

});