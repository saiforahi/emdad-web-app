import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { AddProductService } from 'src/app/shared/services/add-product.service';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-bulk-upload-products',
  templateUrl: './bulk-upload-products.component.html',
  styleUrls: ['./bulk-upload-products.component.css']
})
export class BulkUploadProductsComponent implements OnInit {
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
  catMenuToggle = false;
  selectedCatId: any;
  showFinish: boolean = false;
  urlString: string = '';

  constructor(
    private authService: UserAuthService,
    private getCategories: GetCategoryService,
    private addProducts: AddProductService,
    private router: Router,
    private subscription: SubscriptionService
  ) {
    
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {
    // get seller owned category
    this.getCategories.category().subscribe((item: any) => {
      // console.log(item);
      this.categories = item;
    });
  }

  selectedCat(id, cat, subCat, child){
    console.log("cat id", id)
    this.urlString = cat + " / " + subCat + " / " + child;
    this.selectedCatId = id;
  }

  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }

  onSelect(event) {
    this.files = [];
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
    this.filesDirectory = [];
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
      } else {
        this.successMsgDirectory = response.message;
      }
    });
  }

  finishUpload() {
    this.addProducts.finishBulkUpload(this.files[0].name, this.selectedCatId).subscribe((success: any) => {
      console.log(success)
      this.showFinish = true;
      this.uploadStep2 = false;
    })
  }

  showCatMenu() {
    this.catMenuToggle = true;
  }

  closeCatMenu() {
    this.catMenuToggle = false;
  }

  deleteXlFile(filesName){
    this.addProducts.deleteXl(filesName).subscribe((item: any) => {
      console.log(item)
      if(item.success == "True") {
        this.progress = 0;
        this.files = [];
        this.successMsg = undefined;
        swal(
          'Success',
          'Uploaded file deleted successfully, please upload again.',
          'success'
        );
      }
    })
  }

  deleteDirectory(filesName){
    this.addProducts.deleteXl(filesName).subscribe((item: any) => {
      console.log(item)
      if(item.success == "True") {
        this.progressDirectory = 0;
        this.filesDirectory = [];
        this.successMsgDirectory = undefined;
        swal(
          'Success',
          'Uploaded file deleted successfully, please upload again.',
          'success'
        );
      }
    })
  }

  initialFaze(){
    this.showFinish = false;
    this.files = [];
    this.progress = undefined;
    this.successMsg = undefined;
    this.uploadStep1 = true;
    this.uploadStep2 = false;
    this.filesDirectory = [];
    this.progressDirectory = undefined;
    this.successMsgDirectory = undefined;
  }
}
