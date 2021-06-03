import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AppTitleService } from 'src/app/core/title/app-title.service';
import { MapItem } from '../../shared/map-item.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  zoom = 17;
  center = { lng: 4.849884510040283, lat: 51.20256112288838 };
  mapItems: MapItem[];
  markers: MapItem[];
  infoContent = '';

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor(private titleService: AppTitleService, private httpClient: HttpClient) {
    this.titleService.setTitle('Grondplan');
  }

  ngOnInit(): void {
    this.httpClient.get<MapItem[]>('assets/map.json').subscribe(res => {
      this.markers = res;
    });
  }

  onswipe(event) {
    return null;
  }

  openInfo(marker: MapMarker, content) {
    console.log(content);
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

}
