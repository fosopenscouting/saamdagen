import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkTheme = new Subject<boolean>();

  isDarkTheme$ = this.darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this.darkTheme.next(isDarkTheme);
  }
  constructor() { }
}
