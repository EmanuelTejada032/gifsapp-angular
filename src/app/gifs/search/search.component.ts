import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  //view child takes a reference on the html, could be tags, classes or # local Reference
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>; //non null assertion opperator, It says to typescript the elements will never be null

  search(){
    const value = this.searchBox.nativeElement
    this.searchBox.nativeElement.value = "";
    
  }

}
