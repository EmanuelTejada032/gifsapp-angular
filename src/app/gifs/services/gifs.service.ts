import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Provide the servie in a global context
})

export class GifsService {

  private _history: string[] = [];
  private _api_key: string = "yourapikey"
  private _apiBaseUrl: string = "https://api.giphy.com/v1/gifs"
  public gifsResults: Gif[] = [];
  public lastResults: Gif[] = [];
  

  get history(): string[] {
    return [...this._history];
  }

  constructor( private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem("history")!) || [];
    this.gifsResults = JSON.parse(localStorage.getItem("lastResults")!) || [];
  }

  addGifs(query: string): void{
    query = query.trim().toLocaleLowerCase();
      if(!this._history.includes(query)){
          this._history.unshift(query);
          this._history = this._history.splice(0, 10);
          localStorage.setItem("history",JSON.stringify(this._history));
          
      }

      const params = new HttpParams()
                        .set("api_key", this._api_key)
                        .set("limit", "10")
                        .set("q", query)

      //http module from angular return an observable, offers more functinality than fetch
      this.http.get<GifsSearchResponse>(`${this._apiBaseUrl}/search`, {params}) //Return a gifsSearchResponse interface
      .subscribe( (res) => {
          console.log(res.data);
          this.gifsResults = res.data;
          localStorage.setItem("lastResults",JSON.stringify(this.gifsResults))
          
      })
  }

}
