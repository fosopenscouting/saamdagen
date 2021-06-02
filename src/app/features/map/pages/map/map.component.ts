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
  zoom = 17;
  center = { lng: 4.849884510040283, lat: 51.20256112288838 };

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
