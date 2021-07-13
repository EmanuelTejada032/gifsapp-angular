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
      this._history.unshift(query);
  }

  constructor() { }
}
