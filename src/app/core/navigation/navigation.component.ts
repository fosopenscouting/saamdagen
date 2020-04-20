import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @ViewChild('drawer') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private update: SwUpdate) {}

  onSwipeLeft(event) {
    console.log(event);
  }

  closeDrawer() {

    this.isHandset$.subscribe(res => {
      if (res) {
        this.sidenav.close();
      }
    });
  }

  checkUpdate() {
    this.update.checkForUpdate();
  }

}
