import { Component, OnInit } from '@angular/core';
import { ContentLoaderService } from './services/content-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading:boolean = false;

  constructor (
    private contentLoader: ContentLoaderService
  ) {}

  ngOnInit(): void {
    this.contentLoader.getAllCards();
    setTimeout(()=>{
      console.log(this.contentLoader.Education);
    },2000)
  }
  
  set Loading(newValue:boolean) {
    this.loading = newValue;
  }

}
