import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  isLoading = new BehaviorSubject(true);
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }
}
