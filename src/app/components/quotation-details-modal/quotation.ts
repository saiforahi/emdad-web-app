export interface Quotation {
    id: number;
    RFQ: number;
    date: Date;
    product_name:string;
    sellet_name:string;
    quantity:number;
    unit_price:number;
    total_price:number;
    attachments:any;
  }