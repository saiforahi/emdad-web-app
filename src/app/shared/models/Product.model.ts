export interface Product{
    id: number;
    attachment:Array<any>;
    brand: common_object;
    cart_qty?:number;
    category: common_object;
    color: common_object;
    commission:string;
    created_at:string;
    ddp_lead_time: number;
    delivery_method:number;
    description: string;
    ex_works_lead_time: number;
    image1:string;
    image2:string;
    keyword: Array<common_object>;
    pickup_address: Array<address>;
    seller:seller;
    slug:string;
    status:number;
    stock_quantity:number;
    unit:Array<common_object>;
    unit_price: string;
    vat_amount:string;
}

interface address{
    id:number;
    city:number;
    address:string;
}
interface seller{
    id:number;
    full_name:string;
    store_name?:string;
    store_address?:string;
    profile_pic?:string;
    store_pic?:string;
}

interface common_object{
    id:number;
    name: string;
}