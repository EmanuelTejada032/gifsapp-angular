import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  //view child takes a reference on the html, could be tags, classes or # local Reference
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>; //non null assertion opperator, It says to typescript the elements will never be null

  constructor( private gifsservice: GifsService){}

  search(){
    const value = this.searchBox.nativeElement.value
    if(value){
      this.gifsservice.addGifs(value);
      this.searchBox.nativeElement.value = "";
    }else{
      return;
    }
  }

}
