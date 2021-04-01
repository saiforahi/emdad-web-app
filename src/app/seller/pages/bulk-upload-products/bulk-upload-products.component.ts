import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-bulk-upload-products',
  templateUrl: './bulk-upload-products.component.html',
  styleUrls: ['./bulk-upload-products.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class BulkUploadProductsComponent implements OnInit {
  prodXlUpData = new FormData();
  prodUpDirectoryDate = new FormData();
  prodDirectoryUpform: FormGroup;
  prodXlUpform: FormGroup;
  selectedImage: any = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /*CODE FOR ACTIVATING THE STEPPER */
    /* var $firstButton = $(".first"),
    $secondButton = $(".second"),
    $input = $("input"),
    $name = $(".name"),
    $more = $(".more"),
    $yourname = $(".yourname"),
    $reset = $(".reset"),
    $ctr = $(".container");
  
  $firstButton.on("click", function(e){
    $(this).text("Saving...").delay(900).queue(function(){
      $ctr.addClass("center slider-two-active").removeClass("full slider-one-active");
    });
    e.preventDefault();
  });
  
  $secondButton.on("click", function(e){
    $(this).text("Saving...").delay(900).queue(function(){
      $ctr.addClass("full slider-three-active").removeClass("center slider-two-active slider-one-active");
      $name = $name.val();
      if($name == "") {
        $yourname.html("Anonymous!");
      }
      else { $yourname.html($name+"!"); }
    });
    e.preventDefault();
  }); */
    // copy
    /* balapaCop("Step by Step Form", "#999"); */
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }
  onSubmitProd(value) {

  }

  removeFile() {
    /* this.selectedImage.splice(id, 1); */
  }

  removeDirectory() {

  }

  onSubmit(value) {

  }
}
