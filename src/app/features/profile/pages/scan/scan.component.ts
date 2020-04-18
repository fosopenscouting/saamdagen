import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

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
