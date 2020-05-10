import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {

  titleSource = new BehaviorSubject<string>('Saamdagen');

  title$ = this.titleSource.asObservable();

  constructor(private titleService: Title) { }

  setTitle(title: string) {
    this.titleSource.next(title);

    this.titleService.setTitle(`${title} | Saamdagen`);
  }

}
