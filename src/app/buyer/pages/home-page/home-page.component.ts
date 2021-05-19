import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { GetProductService } from '../../../shared/services/get-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from '../../../../config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  categories;
  subCategories;
  products;
  nextBatchProdLink;
  prodEnd = false;
  isDisplay: any;
  catClickedOnce = false;
  activecategory;
  selectedCat: any;
  subCatChildrens: any;
  activesubcategory: any;
  durationInSeconds: number = 5;
  prodInRow6;
  imgBaseUrl;
  popularCategories: any;

  constructor(
    private categoryServices: GetCategoryService,
    private getProduct: GetProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    public translate:TranslateService
  ) {
    this.imgBaseUrl = config.img_base_url;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.router.url.split('/').length < 3) {
      this.prodInRow6 = true;
    }
    // console.log(this.prodInRow6);
    this.categoryServices.category().subscribe((item) => {
      this.removeEmptyChildren(item);
      this.categories = item;
      console.log("cats",this.categories);
    });
    this.categoryServices.PopularCategory().subscribe((item) => {
      this.popularCategories = item.data[0];
      console.log(this.popularCategories);
    });
    // recent products list
    this.getProduct.product().subscribe((item) => {
      this.products = item.data.results;
      this.nextBatchProdLink = item.data.links.next;
      if (this.nextBatchProdLink == null) {
        this.prodEnd = true;
      }
      // console.log(item);
    });
  }
  
  // set_selected_child_category(child_id){
  //   let cat_id;
  //   let sub_cat_id;
  //   this.categories.forEach(element1 => {
  //     element1.children.forEach(element2 => {
  //       element2.children.forEach(element3 => {
  //         if(element3.id===child_id){
  //           console.log("Element 1",element1.id)
  //           cat_id=element1.id;
  //           sub_cat_id=element2.id;
  //         }
  //       });
  //     });
  //   });
  //   localStorage.setItem('expandedCat',cat_id);
  //   localStorage.setItem('expandedSubCat',sub_cat_id)
  // }

  // remove empty children form the array
  removeEmptyChildren(data) {
    data.forEach((key) => {
      key.children.forEach((key2) => {
        key2.children.forEach((key3) => {
          key3.children.forEach((key4) => {
            key3.children.forEach((key5) => {
              if (key5.children.length == 0) {
                delete key5.children;
              }
            });
            if (key4.children.length == 0) {
              delete key4.children;
            }
          });
          if (key3.children.length == 0) {
            delete key3.children;
          }
        });
        if (key2.children.length == 0) {
          delete key2.children;
        }
      });
      if (key.children.length == 0) {
        delete key.children;
      }
    });
  }

  // category menu list UI functionality
  catClicked(category, index) {
    if (this.catClickedOnce == false) {
      this.isDisplay = 'true';
      this.catClickedOnce = true;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    } else if (this.catClickedOnce == true && this.selectedCat == index) {
      this.isDisplay = 'false';
      this.catClickedOnce = false;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    } else if (this.catClickedOnce == true && this.selectedCat != index) {
      this.isDisplay = 'true';
      this.catClickedOnce = true;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    }
  }

  // set active state for category
  setCatActiveIndex(index) {
    this.activecategory = index;
  }

  // get active state for category
  getCatActiveClass(i) {
    return this.activecategory == i ? 'active' : '';
  }

  // show the sub category children on hover
  showChildrenCat(subCat, index) {
    this.subCatChildrens = subCat[index].children;
    this.setSubCatActiveIndex(index);
  }

  // set active state for subcategory
  setSubCatActiveIndex(index) {
    this.activesubcategory = index;
  }

  // set active state for subcategory
  getSubCatActiveClass(i) {
    return this.activesubcategory == i ? 'active' : '';
  }

  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
      //Do your action here
      // console.log('reached bootm');
      this.getProduct
        .getNextBatchProduct(this.nextBatchProdLink)
        .subscribe((item) => {
          this.products = [...this.products, ...item.data.results];
          this.nextBatchProdLink = item.data.links.next;
        });
    }
    if (this.nextBatchProdLink == null) {
      this.prodEnd = true;
      // this.openSnackBar('No more product to show!', 'OK');
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   //In chrome and some browser scroll is given to body tag
  //   let pos =
  //     (document.documentElement.scrollTop || document.body.scrollTop) +
  //     document.documentElement.offsetHeight;
  //   let max = document.documentElement.scrollHeight;
  //   // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
  //   if (pos >= max - 1 && this.nextBatchProdLink != null) {
  //     //Do your action here
  //     console.log('reached bootm');
  //     this.getProduct
  //       .getNextBatchProduct(this.nextBatchProdLink)
  //       .subscribe((item) => {
  //         this.products = [...this.products, ...item.data.results];
  //         this.nextBatchProdLink = item.data.links.next;
  //       });
  //   }
  //   if (this.nextBatchProdLink == null) {
  //     this.prodEnd = true;
  //   }
  // }
}
