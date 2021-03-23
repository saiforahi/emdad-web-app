import {Component,OnInit} from '@angular/core';
import { AboutUsService } from '../../../shared/services/about-us.service';
import { config } from '../../../../config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  aboutusData: any;
 base_url = config.base_url.slice(0, config.base_url.length - 1); // / is with base_url so remove that
  section2Description: any;
  viewInitiated: boolean;
visionDesc:any;
 missionDesc:any;
 valuesDesc:any;
  constructor(
    private aboutus: AboutUsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.aboutus.getAboutUsData().subscribe((data) => {
      this.aboutusData = data.data[0];
      console.log('data', this.aboutusData);
      this.section2Description = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].sec2_description
      );
      this.visionDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].sec1_description
      );
      this.missionDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].sec3_description
      );
      this.valuesDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].sec4_description
      );
    });
  }
}
