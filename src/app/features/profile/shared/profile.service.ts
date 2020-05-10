import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private storageKey = 'TICKET';

  private ticketSource = new BehaviorSubject<Ticket>(null);

  ticket$ = this.ticketSource.asObservable();

  constructor() {
    const ticketStorage = JSON.parse(localStorage.getItem(this.storageKey));

    if (ticketStorage) {
      this.ticketSource.next(ticketStorage);
    }
   }

  setTicket(ticket: Ticket) {
    this.ticketSource.next(ticket);
    localStorage.setItem(this.storageKey, JSON.stringify(ticket));
  }
}
