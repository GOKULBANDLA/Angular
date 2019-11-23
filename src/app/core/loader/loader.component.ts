import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
showLoader:boolean=true;
  constructor(public loader:LoaderService) { }
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  ngOnInit() {
   /*  this.loader.isLoading.subscribe(x=>{
      this.showLoader=x;
    }) */
  }

}
