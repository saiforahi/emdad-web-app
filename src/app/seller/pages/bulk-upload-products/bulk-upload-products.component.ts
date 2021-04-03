import { Component, OnInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { AddProductService } from 'src/app/shared/services/add-product.service';

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
  // -------------------
  categories: any;
  @ViewChild('sidenav') sidenav: any;
  sideMenuCollapsed = false;
  files: File[] = [];
  progress;
  successMsg: any;
  uploadStep1 = true;
  uploadStep2 = false;
  filesDirectory: any = [];
  progressDirectory: any;
  successMsgDirectory: any;

  constructor(
    private fb: FormBuilder,
    private getCategories: GetCategoryService,
    private addProducts: AddProductService
  ) {}

  ngOnInit(): void {
    // get seller owned category
    this.getCategories
      .categoriesOfSeller(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        // console.log(item);
        this.categories = item.data[0].category_info;
      });
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

  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }

  onSelect(event) {
    this.progress = 0;
    console.log(event);
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append('file', this.files[0], this.files[0].name);
    this.addProducts.uploadXl(formData).subscribe((response) => {
      console.log(response);
      if (typeof response.message == 'number') {
        this.progress = response.message;
        // event.srcElement.value = null;
        this.files = [];
      } else {
        this.successMsg = response.message;
      }
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  uploadNextStep() {
    this.uploadStep1 = false;
    this.uploadStep2 = true;
  }

  onSelectDirectory(event) {
    this.progressDirectory = 0;
    console.log(event);
    this.filesDirectory.push(...event.addedFiles);
    const formData = new FormData();
    formData.append(
      'file',
      this.filesDirectory[0],
      this.filesDirectory[0].name
    );
    this.addProducts.uploadDirectory(formData).subscribe((response) => {
      console.log(response);
      if (typeof response.message == 'number') {
        this.progressDirectory = response.message;
        // event.srcElement.value = null;
        this.filesDirectory = [];
      } else {
        this.successMsgDirectory = response.message;
      }
    });
  }

  finishUpload() {
    this.files = [];
    this.progress = undefined;
    this.successMsg = undefined;
    this.uploadStep1 = true;
    this.uploadStep2 = false;
    this.filesDirectory = [];
    this.progressDirectory = undefined;
    this.successMsgDirectory = undefined;
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }
  onSubmitProd(value) {}

  removeFile() {
    /* this.selectedImage.splice(id, 1); */
  }

  removeDirectory() {}

  onSubmit(value) {}
}
