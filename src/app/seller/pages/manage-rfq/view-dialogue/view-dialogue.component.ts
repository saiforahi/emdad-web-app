import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
@Component({
  selector: 'app-view-dialogue',
  templateUrl: './view-dialogue.component.html',
  styleUrls: ['./view-dialogue.component.css']
})
export class ViewDialogueComponent implements OnInit {
 btnShow:boolean=true;
 isShown:boolean = false;
 error: any;
 msg;
 prodRfqForm:FormGroup;
 quoteFormShow :boolean=false;
 prodQuantity:AbstractControl;
 unitPrice:AbstractControl;
 totalPrice:AbstractControl;
 attachments: AbstractControl;
 numberPattern ='^[0-9]$';
 selectedImage:any=[];
 prodRfqFormData = new FormData();

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService,) { }

  ngOnInit(): void {
    this.prodRfqForm = this.fb.group({
      prodQuantity: ['',[Validators.required,Validators.pattern(this.numberPattern)]],
      unitPrice: ['',[Validators.required,Validators.pattern(this.numberPattern)]],
      totalPrice:['',[Validators.required,Validators.pattern(this.numberPattern)]],
      attachments:[''],
       });
       this.prodQuantity = this.prodRfqForm.controls['prodQuantity'];
       this.unitPrice = this.prodRfqForm.controls['unitPrice'];
       this.totalPrice=this.prodRfqForm.controls['totalPrice'];
       this.attachments = this.prodRfqForm.controls['attachments'];
  }
  onSubmit(value){
    this.prodRfqFormData.append("prodQuantity",value.prodQuantity);
    this.prodRfqFormData.append("unitPrice",value.unitPrice);
    this.prodRfqFormData.append("totalPrice",value.totalPrice);
  }
  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  removeFile(id){
    this.selectedImage.splice(id, 1);
  }
  showQuote(){
    this.btnShow=false;
    this.isShown=true;
  }
}

