import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import{SecurityContext} from '@angular/core';
import { OurPartnersService } from 'src/app/shared/services/our-partners.service';
import { SellOnEmdadService } from 'src/app/shared/services/sell-on-emdad.service';
import { config } from '../../../../config';

@Component({
  selector: 'app-sell-on-emdad-page',
  templateUrl: './sell-on-emdad-page.component.html',
  styleUrls: ['./sell-on-emdad-page.component.css']
})
export class SellOnEmdadPageComponent implements OnInit {
  //variable initialization
  base_url = config.base_url.slice(0, config.base_url.length - 1); // / is with base_url so remove that
  partnersData: any;
  sellData:any;
  whyUs:any;
  partnerArray;
  textValue: any;
  normalVal: any;
  constructor(
    private seller : SellOnEmdadService,
    private partners: OurPartnersService,
    private sanitizer: DomSanitizer


  ) { }

  ngOnInit(): void {
    //fetch data from both our partners api and sell on emdad api
    this.partners.getOurPartnersData().subscribe((data) => {
      this.partnersData = data.data[0];
      console.log('partners', this.partnersData);
      this.partnerArray = this.partnersData.our_partner;
     
    });
    this.seller.getSellingData().subscribe((item) =>{
      this.sellData = item.data[0];
      console.log('emdad', this.sellData);
      this.normalVal =  this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(  this.sellData.description));
      
     
   
    })
  }

}
