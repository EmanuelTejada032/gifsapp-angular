import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //Provide the servie in a global context
})

export class GifsService {

  private _history: string[] = [];

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
      this.http.get('https://api.giphy.com/v1/gifs/search?api_key=yourapikey&q=cheeseburgers&limit=10&lang=en')
      .subscribe( (res: any) => {
          console.log(res.data);
      })
  }

}
