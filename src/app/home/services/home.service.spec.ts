import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeService } from './home.service';
import { HttpClient } from '@angular//common/http';
import { TMDB_URLS, JSON_SERVER_URLS, BASE_URL } from '../../shared/config';
import { environment } from '../../../environments/environment';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
const nowPlayingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.NOW_PLAYING_MOVIES + environment.API_KEY + '&page=';
const upcomingMoviesUrl = BASE_URL.TMDB_API + TMDB_URLS.UPCOMING_MOVIES + environment.API_KEY + '&page=';
const genresUrl = BASE_URL.TMDB_API + TMDB_URLS.GENRES + environment.API_KEY + '&language=en-US';
const sortPreferenceUrl = environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS;
const mockStore={
  dispatch:()=>{

  }
}
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [HomeService,{provide:Store,useValue:mockStore}],
    imports: [HttpClientTestingModule]
  });
});
describe('HomeService', () => {
  let service:HomeService;
  let fixture:ComponentFixture<HomeService>
  function setup() {
    const sharedService = TestBed.get(HomeService);
    const httpTestingController = TestBed.get(HttpTestingController);
    return { sharedService, httpTestingController };
  }
  const http: any = {
   // left free
  };


  beforeEach(() => {
 service=TestBed.get(HomeService)
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });
 
  it('should return the json', () => {
    const{sharedService, httpTestingController}=setup();
    sharedService.getUserPreference().subscribe(data => {
      expect(data).toBe(preference);
    });

    const req = httpTestingController.expectOne(sortPreferenceUrl);
    expect(req.request.method).toBe('GET');
    const preference = { cast: ['case1', 'case1', 'case1', 'case1'], crew: ['case1', 'case1', 'case1', 'case1'] };
    req.flush(preference);
  });
});
