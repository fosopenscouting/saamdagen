import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'saamdagen';
  isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
}
