import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../shared/profile.service';
import { Ticket } from '../../shared/ticket.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private ticketSubscription: Subscription;
  ticket: Ticket;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.ticketSubscription = this.profileService.ticket$.subscribe(res => {
      this.ticket = res;
    });
  }

  ngOnDestroy() {
    this.ticketSubscription.unsubscribe();
  }

}
