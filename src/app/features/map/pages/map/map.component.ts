import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  zoom = 19;
  center = { lng: 4.850511, lat: 51.200876 };

  constructor() {}

  ngOnInit(): void {}
}
