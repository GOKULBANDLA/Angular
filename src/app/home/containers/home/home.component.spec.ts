import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomeModule } from '../../home.module';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { MovieDropdownsComponent } from 'src/app/shared/movie-dropdowns/movie-dropdowns.component';
import { MovieCardComponent } from '../../components/home-page/movie-card/movie-card.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovieBookingComponent } from 'src/app/shared/movie-booking/movie-booking.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from '../../services/home.service';
const storeStub = {
    select: () => {
      const todos = [{id: 1}];
      return of( todos );
    }
  };
describe('HomeComponentinContainers', () => {
    let component:HomeComponent;
    let fixture:ComponentFixture<HomeComponent>;
    let homeService: HomeService;
    beforeEach(async(() => {
        homeService=  jasmine.createSpyObj('HomeService', ['getNowshowing','getUpcomingMovies','getGenres','fetchGenres','']);
        TestBed.configureTestingModule({
          imports: [BrowserAnimationsModule,MaterialModule,FlexLayoutModule,ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule]
         ,
          declarations: [
           HomeComponent,HomePageComponent,MovieDropdownsComponent,MovieCardComponent,MovieBookingComponent
        ],
        providers:[
            {provide:Store,useValue:storeStub},
            {provide:HomeService,useValue:homeService}
        ]
         
        }).compileComponents();
      }));

      beforeEach(()=>{
        fixture=TestBed.createComponent(HomeComponent);
       
        component=fixture.componentInstance;
        fixture.detectChanges();
       });

       it('Create Home Component',()=>{
        expect(component).toBeTruthy();
       });

       it('should run #ngOnInit()', async () => {
        spyOn(component, 'ngOnInit');
        const result = component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });
         it('getGenre',()=>{
        expect(component.genresList).toBe(homeService.fetchGenres())
        })
      
      
        it('should run #getNewSetofNowPlayingMovies()', async () => {
            let page= "3"
          const result = component.getNewSetofNowPlayingMovies(page);
        });
      
        it('should run #getNewSetofComingMovies()', async () => {
            let page = "3"
          const result = component.getNewSetofComingMovies(page);
        });
});