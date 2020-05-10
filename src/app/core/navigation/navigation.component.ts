import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';
import { AppTitleService } from '../title/app-title.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    title$: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private update: SwUpdate,
    private titleService: AppTitleService) {
    }

    ngOnInit() {
      this.title$ = this.titleService.title$;
    }

  checkUpdate() {
    this.update.checkForUpdate();
  }

}
