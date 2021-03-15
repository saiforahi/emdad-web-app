import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-rfq-modal-product-description',
  templateUrl: './rfq-modal-product-description.component.html',
  styleUrls: ['./rfq-modal-product-description.component.css']
})
export class RfqModalProductDescriptionComponent implements OnInit {
//Getting related data to quotation id from parent manage-rfq page
  @Input() rfqDetailData;

  constructor() { }

  ngOnInit(): void {
  }

}
