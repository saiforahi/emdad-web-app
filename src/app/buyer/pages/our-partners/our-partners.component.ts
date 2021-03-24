import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { OurPartnersService } from '../../../shared/services/our-partners.service';
import { config } from '../../../../config';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.css'],
  providers: [NgbCarouselConfig],
})
export class OurPartnersComponent implements OnInit {
  //variable initialization
  currentTab :any;
  nextBtnDisabled:boolean=false;
  prevBtnDisabled:boolean=true;
slides:any;
  partnersData: any;
  headerIssue;
  successCaoursel:any;
  showNavigationArrows = false;
  showNavigationIndicators = true;
 base_url = config.base_url.slice(0, config.base_url.length - 1); // / is with base_url so remove that
  constructor(
    private partners: OurPartnersService,
    private sanitizer: DomSanitizer,
    
/*    private changeDetection: ChangeDetectionStrategy.OnPush, */
  ) { }

  ngOnInit(): void {
//get data from partners api
    this.partners.getOurPartnersData().subscribe((data) => {
      this.partnersData = data.data[0];
      console.log('partners', this.partnersData);
      this.currentTab=this.partnersData.our_partner_success_story[0];
     this.slides=this.partnersData.our_partner_success_story;
     this.successCaoursel=this.partnersData.our_partner_slider;
      this.headerIssue = this.sanitizer.bypassSecurityTrustHtml(
        this.partnersData.sec1_description
      );
    });
  
    
  }

//previous
prev(){
  if (this.currentTab !== this.partnersData.our_partner_success_story[0]) {
    const currTab = this.currentTab;
    const i = this.slides.findIndex(function (el) {
        return el === currTab;
    });
    this.currentTab = this.slides[i - 1];
    this.nextBtnDisabled = false;
}
if(this.currentTab === this.partnersData.our_partner_success_story[0])  {
  this.prevBtnDisabled = true;
}
}

//next

next() {
  if (this.currentTab !== this.slides[this.slides.length - 1]) {
      const currTab = this.currentTab;
      const i = this.slides.findIndex(function (el) {
          return el === currTab;
      });
      this.currentTab = this.slides[i + 1];
      this.prevBtnDisabled = false;
  }
  if (this.currentTab == this.slides[this.slides.length - 1]) {
    this.nextBtnDisabled = true;
  }
}



}

