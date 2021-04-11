import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/core/title/app-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: AppTitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Saamdagen')
  }

}
