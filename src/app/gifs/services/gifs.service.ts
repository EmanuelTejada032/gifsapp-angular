import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Provide the servie in a global context
})

export class GifsService {

  private _history: string[] = [];
  public gifsResults: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor( private http: HttpClient) {
    const localData = localStorage.getItem("history")
    if(localData){
      this._history = JSON.parse(localData!)
    }
      
  }

  addGifs(query: string): void{
    query = query.trim().toLocaleLowerCase();
      if(!this._history.includes(query)){
          this._history.unshift(query);
          this._history = this._history.splice(0, 10);
          localStorage.setItem("history",JSON.stringify(this._history));
          
      }

      //http module from angular return an observable, offers more functinality than fetch
      this.http.get<GifsSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=sRYMDEom54Yx0YpoZn5TnuAm7XlvUnXJ&q=${query}&limit=10&lang=en`) //Return a gifsSearchResponse interface
      .subscribe( (res) => {
          console.log(res.data);
          this.gifsResults = res.data;
          
      })
  }

}
