import { Component, OnInit } from '@angular/core';
import{PrivacyPolicyService} from '../../../shared/services/privacy-policy.service';
import { config } from '../../../../config';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.css']
})
export class PrivacyPolicyPageComponent implements OnInit {
privacyData:any;
privacyDesc:any;
policyDesc:any;
  constructor(
    private policy: PrivacyPolicyService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.policy.getPrivacyPolicyData().subscribe((data) =>{
      this.privacyData = data.data[0];
      this.privacyDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].privacy_policy
      );
     /*  this.policyDesc = this.sanitizer.bypassSecurityTrustHtml(
        data.data[0].policy
      ) */
    })
  }

}
