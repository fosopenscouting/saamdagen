import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {

    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));

    const sixHourInterval$ = interval(6 * 60 * 60 * 1000); // An interval of 6 hours in milliseconds

    const sixHourIntervalIfAppIsStable$ = concat(appIsStable$, sixHourInterval$);

    sixHourIntervalIfAppIsStable$.subscribe(() => {
      updates.checkForUpdate();
    });

   }
}
