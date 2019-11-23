import { MovieDescriptionComponent } from "./movie-description.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('MovieDescriptionComponent', () => {
    let component:MovieDescriptionComponent;
    let fixture:ComponentFixture<MovieDescriptionComponent>
 
 
   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports: [
       ],
       declarations: [
        MovieDescriptionComponent
       ]
      
     }).compileComponents();
   }));
   
 beforeEach(()=>{
  fixture=TestBed.createComponent(MovieDescriptionComponent);
  component=fixture.componentInstance;
  fixture.detectChanges();
 });
 
   it('should create', () => {
     expect(component).toBeTruthy();
   })
   it('should run #ngOnInit()', async () => {
     spyOn(component, 'ngOnInit');
     const result = component.ngOnInit();
     expect(component.ngOnInit).toHaveBeenCalled();
 });
   
  
 });
 