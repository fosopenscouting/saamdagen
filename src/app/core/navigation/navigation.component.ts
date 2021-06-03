import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';
import { AppTitleService } from '../title/app-title.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isHandset: boolean;

    title$: Observable<string>;

    private handsetSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private update: SwUpdate,
    private titleService: AppTitleService) {
    }

    ngOnInit() {
      this.title$ = this.titleService.title$;

      this.handsetSubscription = this.isHandset$.subscribe(res => {
        this.isHandset = res;
      });
    }

    ngOnDestroy() {
      this.handsetSubscription.unsubscribe();
    }

  checkUpdate() {
    this.update.checkForUpdate();
  }

}
