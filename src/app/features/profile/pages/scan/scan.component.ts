import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

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

  constructor() { }

  ngOnInit(): void {

  }

  onScanSuccess(result: string) {
    console.log(result);
  }

  onHasPermission(event) {
    this.hasPermission = event;
  }
}
