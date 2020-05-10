import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { Observable } from 'rxjs';
import { AppTitleService } from 'src/app/core/title/app-title.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isDarkTheme$: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    private titleService: AppTitleService) {
      this.titleService.setTitle('Instellingen');
     }

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
