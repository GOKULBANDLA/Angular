import { SocialFeedsComponent } from "./social-feeds.component";
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('SocialFeedComponent', () => {
    let component:SocialFeedsComponent;
    let fixture:ComponentFixture<SocialFeedsComponent>
 
 
   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports: [
       ],
       declarations: [
        SocialFeedsComponent
       ]
      
     }).compileComponents();
   }));
   
 beforeEach(()=>{
  fixture=TestBed.createComponent(SocialFeedsComponent);
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
 