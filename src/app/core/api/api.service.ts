import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/features/profile/shared/ticket.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'https://ticketing.fos.be/api';

  constructor(private httpClient: HttpClient) { }

  getTicket(hash: string): Observable<Ticket> {
    return this.httpClient.get<any>(`${this.BASE_URL}/ticket?hash=${hash}`).pipe(map(data => {

      const ticket = new Ticket();

      ticket.firstName = data.data.firstName;
      ticket.lastName = data.data.lastName;
      ticket.firstActivity = data.data.submissionData.data.formValues.woorkshops_voormiddag;
      ticket.secondActivity =
        data.data.submissionData.data.formValues.workshops_namiddag;

      return ticket;
    }));
  }
}