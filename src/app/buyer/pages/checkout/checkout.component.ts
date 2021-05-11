import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { AddressService } from '../../../shared/services/address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from '../../../shared/services/country-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  addressForm = new FormGroup({
    buyer: new FormControl(parseInt(localStorage.getItem('uid'))),
    address: new FormControl('', Validators.required),
    city: new FormControl('-1', Validators.required),
    country: new FormControl('-1', Validators.required),
    area: new FormControl(''),
    zip_code: new FormControl('', Validators.required),
  });
  show_loader: boolean = false;
  add_order_response: any;
  add_payment_response: any;
  isCard: boolean;
  isWired: boolean;
  payment_type: any;
  new_address: boolean;
  cash_details: any;
  addresses: any[] = [];
  user: any;
  countries: any = [];
  cities: any = [];
  selected_address: any;
  new_address_add_form_submitted: boolean;
  admin_bank_info:any
  totalItems:any;
  cart_details:any
  constructor(
    private countryListService: CountryListService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private authService: UserAuthService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    console.log(localStorage.getItem('token'))
    this.countryListService.allCountries().subscribe((response) => {
      this.countries = [...response.data];
      console.log(this.countries);
    });
    this.orderService.getAdminBankAccountInfo().subscribe(
      (success)=>{console.log('bank info',success.data[0]);this.admin_bank_info=success.data[0]}
    )
    this.isCard = true;
    this.payment_type = '1';
    this.isWired = false;
    this.cash_details = JSON.parse(localStorage.getItem('cart_cash'));
    console.log('cash details', this.cash_details);
    this.cart_details = JSON.parse(localStorage.getItem('cart_items'));
    this.totalItems=this.cart_details.total_items
    console.log("cart details",this.cart_details);
    this.addressService.get_addresses().subscribe((success) => {
      this.addresses = success.data;
      console.log('addresses',success.data)
      if (this.addresses?.length == 1) {
        this.selected_address = 0;
      }
    });
    this.authService.getUser(localStorage.getItem('uid')).subscribe((data) => {
      this.user = data.data;
      console.log(this.user);
      // if country is already set then load the cities of the country
    });
  }

  show_card_inputs() {
    //
    document.getElementById('a_card').classList.add('pay-option-selected');
    document.getElementById('a_wire').classList.remove('pay-option-selected');
    this.isWired = false;
    this.isCard = true;
    this.payment_type = '1';
  }

  show_wired_inputs() {
    document.getElementById('a_wire').classList.add('pay-option-selected');
    document.getElementById('a_card').classList.remove('pay-option-selected');
    this.isCard = false;
    this.isWired = true;
    this.payment_type = '0';
  }

  show_address_form() {
    //new address add form show action
    this.new_address = !this.new_address;
  }

  scrollToAddressForm(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  add_payment() {
    //this.orderService.get_active_shipping_address_of_buyer().subscribe((success) => { //getting active shipping address of buyer
    // console.log(JSON.stringify({
    //   "tran_type" : "sale",
    //   "cart_description" : "sale",
    //   "cart_id" : "400000000000001",
    //   "cart_currency" : "SAR",
    //   "cart_amount" : this.add_order_response.data[0].total_amount,
    //   "customer_details": {
    //     "name": this.user.full_name,
    //     "email": localStorage.getItem('username'),
    //     "phone": this.user.phone,
    //     "street1": this.addresses[this.selected_address].address,
    //     "city": this.addresses[this.selected_address].city.name,
    //     "state": "DU",
    //     "country": this.addresses[this.selected_address].city.country.iso2,
    //     "zip_code": this.addresses[this.selected_address].zip_code,
    //     "ip": "127.0.0.1"
    //   }
    // }))
    //});
    this.orderService
      .add_payment({
        //adding order payment
        tran_type: 'sale',
        cart_description: 'sale',
        cart_id: '400000000000001',
        cart_currency: 'SAR',
        cart_amount: this.add_order_response.data[0].total_amount,
        customer_details: {
          name: this.user.full_name,
          email: localStorage.getItem('username'),
          phone: this.user.phone,
          street1: this.addresses[this.selected_address].address,
          city: this.addresses[this.selected_address].city.name,
          state: 'DU',
          country: this.addresses[this.selected_address].city.country.iso2,
          zip_code: this.addresses[this.selected_address].zip_code,
          ip: '127.0.0.1',
        },
      })
      .subscribe((success) => {
        localStorage.setItem('payment_add_response', JSON.stringify(success));
        console.log(
          'payment_add_response',
          JSON.parse(localStorage.getItem('payment_add_response'))
        );
        window.location.href = success.redirect_url;
      });
  }

  make_order() {
    //console.log(localStorage.getItem('token'))
    //making order
    if (this.selected_address === undefined) {
      swal('Warning', 'Please select an address', 'warning');
    } else {
      console.log('selected address', this.addresses[this.selected_address]);
      this.spinner.show();
      let data = JSON.parse(localStorage.getItem('cart_items')); //setting cart data from localstorage
   
      data.payment_type = parseInt(this.payment_type);
      data.tracking_order.forEach((element) => {
        element.status = this.payment_type == '1' ? 2 : 1;
      });
      data.orders_details.forEach((element) => {
        element.shipping_address=this.addresses[this.selected_address].id
      });
      console.log('cart_data after', JSON.stringify(data));
      this.orderService.putOrder(data).subscribe((success) => {
        console.log('add_order_response',success);
        this.add_order_response = success;
        if (this.isWired) {
          this.spinner.hide();
          localStorage.removeItem('temp_order_id');
          localStorage.removeItem('prodCartArray');
          localStorage.removeItem('finalCart');
          localStorage.removeItem('cart_items');
          localStorage.removeItem('cart_cash');
          localStorage.removeItem('cart');
          this.cartService.existingCartLength.next(null);
          this.router.navigate([
            'order/details/',
            this.add_order_response.data[0].id,
          ]);
          //this.router.navigate(['/profile'], { queryParams: { activeItem: '3',wiredOrderPlaced:'true' } });
        } else {
          localStorage.setItem(
            'temp_order_id',
            this.add_order_response.data[0].id
          );
          localStorage.setItem(
            'temp_order_code',
            this.add_order_response.data[0].order_code
          );
          this.add_payment();
        }
      },
      (error)=>{
        this.spinner.hide();
        swal('Warning','We are currently unable to process your order. Please give a try after sometimes.','warning')
      });
    }
  }

  onNewAddressFormSubmit() {
    this.new_address_add_form_submitted = true;
    this.addressService
      .add_address({
        buyer: this.addressForm.value.buyer,
        address: this.addressForm.value.address,
        city: this.addressForm.value.city,
        country: this.addressForm.value.country,
        zip_code: this.addressForm.value.zip_code,
      })
      .subscribe(
        (success1) => {
          console.log(success1.data);
          this.addresses.push(success1.data);
          this.addressForm.reset();
          this.addressService.get_addresses().subscribe((success2) => {
            this.addresses = success2.data;
            this.new_address = false;
            this.selected_address = this.addresses.length - 1;
            this.new_address_add_form_submitted = false;
            swal('Added', 'New Address added successfully', 'success');
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  download_bank_details(){
    this.spinner.show()
    var doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Emdad Bank details for wire transfer', 20, 20);
    doc.setFontSize(12);
    for (let index = 0; index < this.admin_bank_info.length; index++) {
      // console.log(this.img_base_url + this.orders[index].product.image1);
      doc.text('Account Name: ' + this.admin_bank_info[index].account_name, 20, 55 + index * 100);
      doc.text('Account Number'+this.admin_bank_info[index].account_number, 20, 65 + index * 100);
      doc.text('Bank Name' + this.admin_bank_info[index].bank_name, 20, 75 + index * 100);
      doc.text('Bank Address ' + this.admin_bank_info[index].bank_address, 20, 85 + index * 100);
      doc.text('Swift Code ' + this.admin_bank_info[index].swift_code, 20, 95 + index * 100);
      doc.text('' + this.admin_bank_info[index].swift_code, 20, 105 + index * 100);
      doc.text('' + this.admin_bank_info[index].swift_code, 20, 115 + index * 100);
      //doc.text()
    }
    doc.save('Bank_Details.pdf');
    this.spinner.hide();
  }
  onCountryChange(countryId) {
    // reset city if countryId changed
    console.log(countryId);
    this.countryListService.allCities(countryId).subscribe(
      (data) => {
        this.cities = [...data.data];
        console.log(this.cities);
      },
      (err) => console.error(err)
    );
  }
}
