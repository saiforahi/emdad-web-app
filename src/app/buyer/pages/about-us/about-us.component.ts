import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../../shared/services/about-us.service';
import { config } from '../../../../config';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutusData: any;

  base_url = config.base_url.slice(0, config.base_url.length - 1); // / is with base_url so remove that
  constructor(private aboutus: AboutUsService) { }

  ngOnInit(): void {
    this.aboutus.getAboutUsData().subscribe((data) => {
      this.aboutusData = data.data[0];
 
      console.log("data", this.aboutusData);
    })

  }


}
