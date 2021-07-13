import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //Provide the servie in a global context
})

export class GifsService {

  private _history: string[] = [];

  get history(): string[] {
    return [...this._history];
  }

  addGifs(query: string): void{
    query = query.trim().toLocaleLowerCase();
      if(!this._history.includes(query)){
          this._history.unshift(query);
          this._history = this._history.splice(0, 10);
      }
      
  }

  constructor() { }
}
