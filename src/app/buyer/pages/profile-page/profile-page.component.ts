import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { CountryListService } from '../../../shared/services/country-list.service';
import { Order } from 'src/app/shared/models/Order.model';
import { Quotation } from '../../../shared/models/quotation.model';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog} from '@angular/material/dialog';
import swal from 'sweetalert'
import { ProfileLogoutModal } from '../../components/profile-logout-modal/profile-logout-modal.component';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userId;
  userInfo;
  changePass = false;
  editProfileState = true;
  cities: any = [];
  countries: any = [];
  error;
  userMail;
  country: any;
  city: any;
  show_change_pass_form;
  show_profile_form;
  show_order_history;
  show_manage_quotations;
  channel_quotation: Quotation;

  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private countryList: CountryListService,
    public translate:TranslateService,
    public dialog: MatDialog
  ) {
    this.show_change_pass_form = false;
    this.show_profile_form = true;
    this.show_order_history = false;
    this.show_manage_quotations = false;

    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Defaults to 0 if no query param provided.
      if (params.activeItem == '1') {
        this.show_change_pass_form = false;
        this.show_profile_form = true;
        this.show_order_history = false;
        this.show_manage_quotations = false;
      } else if (params.activeItem == '2') {
        this.show_change_pass_form = true;
        this.show_profile_form = false;
        this.show_order_history = false;
        this.show_manage_quotations = false;
      }else if(params.wiredOrderPlaced == 'true' && params.activeItem == '3'){
        this.show_change_pass_form = false;
        this.show_profile_form = false;
        this.show_order_history = true;
        this.show_manage_quotations = false;
        if(localStorage.getItem('temp_order_id')){
          swal('Order Placed','Upload Invoice to confirm your order #'+localStorage.getItem('temp_order_id'),'success').then(()=>{
            localStorage.removeItem('temp_order_id')
          })
        }
        
      }
      else if(params.cardOrderPlaced == 'true' && params.activeItem == '3'){
        this.show_change_pass_form = false;
        this.show_profile_form = false;
        this.show_order_history = true;
        this.show_manage_quotations = false;
        if(localStorage.getItem('temp_order_id')){
          swal('Order Placed','Your order #'+localStorage.getItem('temp_order_code')+' is confirmedd!','success').then(()=>{
            localStorage.removeItem('temp_order_id')
            localStorage.removeItem('temp_order_code')
          })
        }
      }
       else if (params.activeItem == '3' && params.wiredOrderPlaced==undefined && params.cardOrderPlaced==undefined) {
        this.show_change_pass_form = false;
        this.show_profile_form = false;
        this.show_order_history = true;
        this.show_manage_quotations = false;
      } else if (params.activeItem == '4') {
        this.show_change_pass_form = false;
        this.show_profile_form = false;
        this.show_order_history = false;
        this.show_manage_quotations = true;
      }
    });
    this.userId = localStorage.getItem('uid');
    this.authService.uName.subscribe((data) => {
      this.userMail = data;
    });
    if (this.userId == localStorage.getItem('uid')) {
      this.getCountries();
      this.authService.getUser(this.userId).subscribe((data) => {
        this.userInfo = data.data;
        console.log(this.userInfo);
        // if country is already set then load the cities of the country
        if (this.userInfo.country) {
          this.onCountryChange(this.userInfo.country);
        }
        (error) => (this.error = error);
      });
    } else {
      alert('access is denied');
    }
  }

  // pass_quotation_to_modal(quotation: Quotation) {
  //   console.log('$$$$$$$$$');
  //   console.log(quotation);
  //   console.log('$$$$$$$$$');
  //   this.channel_quotation = quotation;
  //   document.getElementById('quotationDetails').style.display = 'block';
  // }

  logout() {
    this.authService.logout();
  }

  getCountries() {
    this.countryList.allCountries().subscribe(
      (data) => {
        this.country = data.data;
        console.log(data.data);
        this.countries = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }

  show_logout_modal() {
    this.dialog.open(ProfileLogoutModal);
  }

  onCountryChange(countryId) {
    this.countryList.allCities(countryId).subscribe(
      (data) => {
        this.city = data.data;
        console.log(data.data);
        this.cities = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }

  getCountryOfCity(cityId) {
    this.countryList.getCountryOfCity(cityId).subscribe((item) => {
      this.country = item;
    });
  }

  setEditProfile(editProfileState: boolean) {
    this.editProfileState = editProfileState;
    // after profile update, update the city list too
    if (this.userInfo.country) this.onCountryChange(this.userInfo.country);
  }

  updateCities(cities: any) {
    this.cities = cities;
  }

  updateEditedUserInfo(editUserInfo: any) {
    this.userInfo = editUserInfo;
  }
}
