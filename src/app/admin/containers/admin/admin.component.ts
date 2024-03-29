import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Store, State } from '@ngrx/store';
import * as MovieState from '../../../reducers/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit,OnDestroy {
  theaterList;
  subscription: any;
  constructor(private adminService: AdminService, private store: Store<MovieState.State>) {}

  ngOnInit() {
    this.subscription = this.store.select(MovieState.theaterList).subscribe(result => {
      this.theaterList = Object.values(result);
    });
  }

  addTheater(formData) {
    this.adminService.newTheater(formData);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
