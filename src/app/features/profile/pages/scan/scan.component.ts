import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ApiService } from 'src/app/core/api/api.service';
import { Ticket } from '../../shared/ticket.model';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

@ViewChild('scanner')
scanner: ZXingScannerComponent;

  currentDevice: MediaDeviceInfo = null;
  hasPermission: boolean;
  ticket: Ticket;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }

  onScanSuccess(result: string) {
    this.apiService.getTicket(result).subscribe(res => {
     this.ticket = res;
    });
  }

  onHasPermission(event) {
    this.hasPermission = event;
  }
}
