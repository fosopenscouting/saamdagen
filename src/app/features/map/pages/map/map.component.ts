import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AppTitleService } from 'src/app/core/title/app-title.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  zoom = 19;
  center = { lng: 4.850511, lat: 51.200876 };

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap

  constructor(private titleService: AppTitleService, private httpClient: HttpClient) {
    this.titleService.setTitle('Grondplan');
  }

  ngOnInit(): void {
    this.httpClient.get('assets/map.geo.json').subscribe(res => {
      console.log(res);
      this.map.data.addGeoJson(res);
    }) 
    
  }

  onswipe(event) {
    return null;
  }

}
