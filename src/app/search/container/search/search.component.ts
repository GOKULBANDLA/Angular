import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SDialogComponent } from '../../components/s-dialog/s-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.openSearchPage());
  }

  openSearchPage(): void {
    const dialogRef = this.dialog.open(SDialogComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigate(['/home']);
    });
  }
}
