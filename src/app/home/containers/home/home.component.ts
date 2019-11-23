import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';
import * as UserState from '../../../reducers/index';

import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy {
  nowPlayingMoviesList: any = [];
  upcomingMoviesList: any = [];
  genresList: any = [];
  theaterList: any = [];
  userPreference: any = [];
  subscription1;
  subscription2;
  subscription3;
  constructor(
    private store: Store<MovieState.State>,
    private userStore: Store<UserState.State>,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.subscription1 = this.store.select(MovieState.nowPlayingMoviesSelector).subscribe(result => (this.nowPlayingMoviesList = result));
    this.subscription2 = this.store.select(MovieState.upcomingMovieSelector).subscribe(result => {
       this.upcomingMoviesList = result;
     });
     this.theaterList = this.store.select(MovieState.theaterList);
     this.subscription3 = this.userStore.select(UserState.userSelector).subscribe(result => {
       this.userPreference = result.preference;
     });
     this.genresList = this.homeService.getGenres();
  }

  getNewSetofNowPlayingMovies(page) {
    this.homeService.getNowshowing(page);
  }
  getNewSetofComingMovies(page) {
    this.homeService.getUpcomingMovies(page);
  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();

  }
}
