import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'IS_DARK';

  private isDarkThemeSource = new BehaviorSubject<boolean>(false);

  isDarkTheme$ = this.isDarkThemeSource.asObservable();

  constructor() { }

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkThemeSource.next(isDarkTheme);
    localStorage.setItem(this.storageKey, JSON.stringify(isDarkTheme));
  }

  initTheme() {
    const itemInStorage = localStorage.getItem(this.storageKey);

    if (!itemInStorage) {
      this.checkBrowserTheme();
    } else {
      const storageValue = JSON.parse(itemInStorage);
      this.isDarkThemeSource.next(storageValue);
    }
  }
  checkBrowserTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.isDarkThemeSource.next(true);
    }
  }
}

