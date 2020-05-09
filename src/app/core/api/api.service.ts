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
    return this.httpClient.get<any>(`${this.BASE_URL}/ticket?hash=${hash}`).pipe(map(data => data.data));
  }
}
