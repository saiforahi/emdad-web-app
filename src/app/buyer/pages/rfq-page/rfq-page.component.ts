import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuotationService } from '../../../shared/services/quotation.service';
import swal from 'sweetalert';
import { config } from '../../../../config';

@Component({
  selector: 'app-rfq-page',
  templateUrl: './rfq-page.component.html',
  styleUrls: ['./rfq-page.component.css'],
})
export class RfqPageComponent implements OnInit {
  // productData: any = { seller: {} }; // this weird initialization is for error handling :(
  // image: any = null;
  // submitted = false;
  // base_url = config.base_url.slice(0, config.base_url.length - 1); // / is with base_url so remove that
  // clicked = false;
  // rfqForm = this.formBuilder.group({
  //   product: '',
  //   buyer: '',
  //   email: new FormControl('', Validators.required),
  //   phone: new FormControl('', Validators.required),
  //   address: '',
  //   seller: '',
  //   quantity: new FormControl('', Validators.required),
  //   quotation: this.formBuilder.array([
  //     this.formBuilder.group({
  //       message: '',
  //       user: '',
  //     }),
  //   ]),
  //   rfq: { status: 1 },
  // });
  productData;
  image = null;
  rfqForm: FormGroup;
  email: AbstractControl;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  phone: AbstractControl;
  /* phonePattern = '^((\\+91-?)|0)?[0-9]{10}$'; */
  address: AbstractControl;
  quantity: AbstractControl;
  message: AbstractControl;
  prodId: any;

  constructor(
    private getProduct: GetProductService,
    private fb: FormBuilder,
    private quotationService: QuotationService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // if (this.getProduct.productDetailsData === undefined)
    //   this.router.navigate(['/']);
    let uid = localStorage.getItem('uid');
    this.prodId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.prodId).subscribe((item) => {
      this.productData = item.data[0];
      console.log(this.productData);
      if (this.productData.image1) {
        this.image = config.img_base_url + this.productData.image1;
      } else {
        this.image = config.img_base_url + this.productData.image2;
      }
      // this.rfqForm.patchValue({ product: this.productData.id });
      // this.rfqForm.patchValue({ buyer: uid });
      // this.rfqForm.patchValue({ seller: this.productData.seller.id });
      // this.rfqForm.patchValue({ quotation: [{ message: '', user: uid }] });
    });
    this.rfqForm = this.fb.group({
      email: ['',[Validators.required]],
      phone: ['', [Validators.required,Validators.minLength(8)]],
      address: ['',[Validators.required]],
      quantity: ['',[Validators.required]],
      message: ['',[Validators.required]],
    });
    this.email = this.rfqForm.controls['email'];
    this.phone = this.rfqForm.controls['phone'];
    this.address = this.rfqForm.controls['address'];
    this.quantity = this.rfqForm.controls['quantity'];
    this.message = this.rfqForm.controls['message'];
  }

  // "product":1,
  //   "buyer":2,
  //   "email":"cse.hasans06@gmail.com",
  //   "phone":"04843734",
  //   "address":"dfdf",
  //   "seller":2,
  //   "quantity":4,
  //   "quotation" :
  //       [{
  //           "message": "ridoy",
  //       "user":3
  //       }],
  //   "rfq": {
  //       "status":1
  //   }
  calc_unit_price(){
    if(parseFloat(this.productData.commission)>0){
      return (parseFloat(this.productData.unit_price) + (parseFloat(this.productData.unit_price) * (parseFloat(this.productData.commission)/100))).toFixed(2)
    }
    else{
      return (parseFloat(this.productData.unit_price) + (parseFloat(this.productData.unit_price) * (parseFloat(localStorage.getItem('commission'))/100))).toFixed(2)
    }
  }
  onSubmit(value) {
    this.spinner.show();
    var rfqData = {
      product: this.productData.id,
      buyer: localStorage.getItem('uid'),
      email: value.email,
      phone: value.phone,
      address: value.address,
      seller: this.productData.seller.id,
      quantity: value.quantity,
      unit_price: this.calc_unit_price(),
      total_price: (parseFloat(value.quantity) * parseFloat(this.productData.unit_price)).toFixed(2),
      quotation: [
        {
          message: value.message,
          user: localStorage.getItem('uid'),
          quantity: value.quantity,
          unit_price: this.calc_unit_price(),
          total_price: (parseFloat(value.quantity) * parseFloat(this.productData.unit_price)).toFixed(2)
        },
      ],
      rfq: {
        status: 1,
        comments:"initiated"
      },
    };
    console.log(rfqData);
    this.quotationService.createQuotation(rfqData).subscribe(
      (res) => {
        console.log(res);
        this.spinner.hide();
        swal('Succeed!', 'Request for quotation Successfull', 'success');
        this.router.navigate(['/']);
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
        swal('Failed!', err.message, 'error');
      }
    );
    /////////////////////////////////
    // this.spinner.hide();
    // this.submitted = true;
    // this.clicked = true;
    // this.spinner.show();
    // if (
    //   this.rfqForm.get('email').errors == null &&
    //   this.rfqForm.get('phone').errors == null &&
    //   this.rfqForm.get('quantity').errors == null
    // ) {
    //   this.quotationService.createQuotation(this.rfqForm.value).subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.spinner.hide();
    //       swal('Succeed!', 'Request for quotation Successfull', 'success');
    //       this.clicked = false;
    //       this.router.navigate(['/']);
    //     },
    //     (err) => {
    //       console.error(err);
    //       this.spinner.hide();
    //       swal('Failed!', err.message, 'error');
    //       this.clicked = false;
    //     }
    //   );
    // } else {
    //   this.spinner.hide();
    //   this.clicked = false;
    // }
  }
}
