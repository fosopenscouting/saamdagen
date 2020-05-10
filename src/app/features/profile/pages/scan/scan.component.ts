import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ApiService } from 'src/app/core/api/api.service';
import { Ticket } from '../../shared/ticket.model';
import { ProfileService } from '../../shared/profile.service';
import { Router } from '@angular/router';
import { AppTitleService } from 'src/app/core/title/app-title.service';
import { timeout } from 'rxjs/operators';

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
  loading: boolean;
  success: boolean;
  failure: boolean;

  constructor(
    private apiService: ApiService,
    private profileService: ProfileService,
    private router: Router,
    private titleService: AppTitleService) {
      this.titleService.setTitle('Ticket scannen');
     }

  ngOnInit(): void {

  }

  onScanSuccess(result: string) {
    this.loading = true;
    this.apiService.getTicket(result).subscribe(res => {
      this.loading = false;
      this.success = true,
      this.profileService.setTicket(res);
      timeout(2000);
      this.router.navigate(['profile']);
    }, err => {
      this.loading = false;
      this.failure = true;
    });
  }

  onHasPermission(event) {
    this.hasPermission = event;
  }
}
