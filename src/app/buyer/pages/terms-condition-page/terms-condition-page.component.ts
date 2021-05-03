import { Component, OnInit } from '@angular/core';
import{TermsConditionsService} from '../../../shared/services/terms-conditions.service';
import { config } from '../../../../config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-condition-page',
  templateUrl: './terms-condition-page.component.html',
  styleUrls: ['./terms-condition-page.component.css']
})
export class TermsConditionPageComponent implements OnInit {
termsData:any;
termsDesc:any;
conditionsDesc:any;
  constructor(
    private terms: TermsConditionsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.terms.getTermsCondition().subscribe((data) =>{
      this.termsData = data.data[0];
      this.termsDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].terms_conditions
      );
    /*   this.conditionsDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].conditions
      ) */
    })
  }

}
