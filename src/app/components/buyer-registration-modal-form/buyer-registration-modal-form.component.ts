import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-buyer-registration-modal-form',
  templateUrl: './buyer-registration-modal-form.component.html',
  styleUrls: ['./buyer-registration-modal-form.component.css']
})
export class BuyerRegistrationFormComponent implements OnInit {
  error: any;
  msg;
  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  hide_buyer_registration(){
    document.getElementById('buyerRegistration').style.display="none";
  }
  show_login_modal_form(){
    document.getElementById('buyerRegistration').style.display="none";
    document.getElementById('buyerLogin').style.display="block";
  }
  signup(full_name: string, email: string, phone: String, password: string) {
    this.authService.signup(full_name, email, phone, password).subscribe(
      success => {
        // this.router.navigate(['/login']);
        this.msg = success.message;
        console.log(success)
        if(success.success==="True"){
          this.hide_buyer_registration();
          swal("Succeed!",this.msg,"success")
        }
      },
      error => this.error = error
    );
  }

}
