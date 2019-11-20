import { TestBed, async, tick, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from 'src/app/material.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDropdownsComponent } from 'src/app/shared/movie-dropdowns/movie-dropdowns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieBookingComponent } from 'src/app/shared/movie-booking/movie-booking.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule,
    HttpTestingController } from '@angular/common/http/testing';
import { Action, Store } from "@ngrx/store";
import { HomeService } from '../../services/home.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('HomepageComponent', () => {
   let component:HomePageComponent;
   let fixture:ComponentFixture<HomePageComponent>


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        RouterTestingModule,MaterialModule,ReactiveFormsModule,FlexLayoutModule,HttpClientTestingModule,
      ],
      declarations: [
        HomePageComponent,MovieCardComponent,MovieDropdownsComponent,MovieBookingComponent
      ],providers:[
        { provide: Store }
      ]
     
    }).compileComponents();
  }));
  
beforeEach(()=>{
 fixture=TestBed.createComponent(HomePageComponent);
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
  
it('Get Genre',()=>{
    component.getGenre('action');
    expect(component.selectedGenre).toBe('action');
})
it('Get Language',()=>{
    component.getLanguage('en');
    expect(component.selectedLanguage).toBe('en');
})
 
});

