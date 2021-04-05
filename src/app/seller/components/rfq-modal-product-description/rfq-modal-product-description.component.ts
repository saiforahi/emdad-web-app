import { Component, OnInit,Input } from '@angular/core';
import {config} from '../../../../config';

@Component({
  selector: 'app-rfq-modal-product-description',
  templateUrl: './rfq-modal-product-description.component.html',
  styleUrls: ['./rfq-modal-product-description.component.css']
})
export class RfqModalProductDescriptionComponent implements OnInit {
@Input() rfqDetailData;
img_base_url=config.img_base_url;
  constructor() { }

  ngOnInit(): void {
    console.log('modal component detail',this.rfqDetailData)
  }

}
