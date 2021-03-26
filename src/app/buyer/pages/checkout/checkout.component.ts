import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { AddressService } from '../../../shared/services/address.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from '../../../shared/services/country-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
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

  constructor(
    private countryListService: CountryListService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private authService: UserAuthService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.countryListService.allCountries().subscribe((response) => {
      this.countries = [...response.data];
      console.log(this.countries);
    });
    this.isCard = true;
    this.payment_type = '1';
    this.isWired = false;
    this.cash_details = JSON.parse(localStorage.getItem('cart_cash'));
    this.authService.getUser(localStorage.getItem('uid')).subscribe((data) => {
      this.user = data.data;
      console.log(this.user);
      // if country is already set then load the cities of the country
    });
    this.addressService.get_addresses().subscribe((response) => {
      console.log(response.data);
      this.addresses = response.data;
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
    console.log(localStorage.getItem('token'))
    //making order
    if (this.selected_address === undefined) {
      swal('Warning', 'Please select an address', 'warning');
    } else {
      this.spinner.show();
      let data = JSON.parse(localStorage.getItem('cart_items')); //setting cart data from localstorage
      data.payment_type = parseInt(this.payment_type);
      console.log('cart_data', JSON.stringify(data));
      this.orderService.putOrder(data).subscribe((success) => {
        this.add_order_response = success;
        console.log(this.add_order_response);
        localStorage.setItem(
          'temp_order_id',
          this.add_order_response.data[0].id
        );
        if (this.isWired) {
          localStorage.removeItem('finalCart');
          localStorage.removeItem('prodCartArray');
          localStorage.removeItem('cart_items');
          this.spinner.hide();
          this.router.navigate([
            'order/details/',
            this.add_order_response.data[0].id,
          ]);
        } else {
          this.add_payment();
        }
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
