import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';
import { Observable } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { UpdateService } from './core/update/update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingService } from './core/logging/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'saamdagen';
  isDarkTheme$: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private updates: SwUpdate,
    private updateService: UpdateService,
    private snackbar: MatSnackBar,
    private loggingService: LoggingService) {

    this.updates.available.subscribe(res => {
      const snackRef = this.snackbar.open('Er is een nieuwe versie beschikbaar!', 'Bijwerken');

      snackRef.onAction().subscribe(() => {
        this.activateUpdate();
      });
    });
   }

  ngOnInit() {
    this.themeService.initTheme();
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  activateUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
