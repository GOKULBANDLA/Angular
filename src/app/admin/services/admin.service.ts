import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';
import { TMDB_URLS, JSON_SERVER_URLS, BASE_URL } from '../../shared/config';
import { environment } from '../../../environments/environment';
import { concatMap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { LogService } from 'src/app/shared/Services/Global/log.service';
const SEARCH_URL = BASE_URL.TMDB_API + TMDB_URLS.SEARCH_URL;
const THEATERS_URL = environment.JSONSERVER + JSON_SERVER_URLS.THEATER_URL;

@Injectable()
export class AdminService {
  constructor(private http: HttpClient, private logger: LogService) {
  }

  newTheater(data) {
    let newTheaters = [],
      newObject;

    this.http
      .get(THEATERS_URL)
      .pipe(
        concatMap(value => {
          newObject = value;
          newTheaters = newObject['theaters'];
          newTheaters.push(data);
          return this.http.put(THEATERS_URL, newObject);
        }),
        catchError(err => {
          this.logger.error(err, 'Error in Fetching Data');
          return throwError(err);
        })
      )
      .subscribe(
        res => {
          this.logger.info(JSON.stringify(res), 'Success');
        },
        e => {
          this.logger.error(e, 'while updating data');
        },
        () => {
          this.logger.info('Completed adding new threater');
        }
      );
  }

  searchMovie(term) {
    return this.http.get(SEARCH_URL + environment.API_KEY + '&query=' + term);
  }
  saveNowPlaying(nowPlaying, theaterId) {
    let newObject;
    if (nowPlaying.length > 0) {
      this.http
        .get(THEATERS_URL)
        .pipe(
          concatMap(value => {
            newObject = value;
            newObject['theaters'].forEach(theater => {
              if (theater.id === theaterId) {
                theater.movies = nowPlaying;
              }
            });
            return this.http.put(THEATERS_URL, newObject);
          }),
          catchError(err => {
            this.logger.error(err, 'while Fetching data');
            return throwError(err);
          })
        )
        .subscribe(
          res => {
          this.logger.info(JSON.stringify(res), 'Success');
          },
          e => {
            this.logger.error(e, 'while updating data');
          },
          () => {
            this.logger.info('Completed updating new threater');
          }
        );
    }
  }
}
