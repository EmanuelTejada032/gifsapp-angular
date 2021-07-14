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

  constructor( private http: HttpClient) { }

  addGifs(query: string): void{
    query = query.trim().toLocaleLowerCase();
      if(!this._history.includes(query)){
          this._history.unshift(query);
          this._history = this._history.splice(0, 10);
      }

      //http module from angular return an observable, offers more functinality than fetch
      this.http.get<GifsSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=yourapikey&q=${query}&limit=10&lang=en`) //Return a gifsSearchResponse interface
      .subscribe( (res) => {
          console.log(res.data);
          this.gifsResults = res.data;
          
      })
  }

}
