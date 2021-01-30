import {Component, Input} from '@angular/core';
import {Quotation} from '../quotation-details-modal/quotation'
@Component({
    selector: 'quotation-details-modal',
    styleUrls: ['./quotation-details-modal.component.css'],
    templateUrl: './quotation-details-modal.component.html'
})
export class QuotationDetailsModal {
    constructor() {}
    @Input() quotation:Quotation
    hide(){
        document.getElementById('quotationDetails').style.display="none";
    }
}