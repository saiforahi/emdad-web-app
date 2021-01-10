import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { GetProductService } from '../../shared/services/get-product.service';

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

  constructor(
    private categoryServices: GetCategoryService,
    private getProduct: GetProductService
  ) {}

  ngOnInit(): void {
    this.categoryServices.category().subscribe((item) => {
      this.removeEmptyChildren(item);
      this.categories = item;
      console.log(this.categories);
    });
    this.getProduct.product().subscribe((item) => {
      this.products = item.data.results;
      this.nextBatchProdLink = item.data.links.next;
      if (this.nextBatchProdLink == null) {
        this.prodEnd = true;
      }
      console.log(item);
    });
  }

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

  catClicked(category, index){
    if(this.catClickedOnce == false){
      this.isDisplay = 'true';
      this.catClickedOnce = true;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    }else if (this.catClickedOnce == true && this.selectedCat == index){
      this.isDisplay = 'false';
      this.catClickedOnce = false;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    }else if (this.catClickedOnce == true && this.selectedCat != index){
      this.isDisplay = 'true';
      this.catClickedOnce = true;
      this.selectedCat = index;
      this.subCatChildrens = [];
      this.setCatActiveIndex(index);
      this.activesubcategory = 'notActive';
    }
  }

  setCatActiveIndex(index) {
    this.activecategory = index;
  }

  getCatActiveClass(i) {
    return this.activecategory == i ? 'active' : '';
  }

  showChildrenCat(subCat, index){
    this.subCatChildrens = subCat[index].children;
    this.setSubCatActiveIndex(index);
  }

  setSubCatActiveIndex(index) {
    this.activesubcategory = index;
  }

  getSubCatActiveClass(i) {
    return this.activesubcategory == i ? 'active' : '';
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos >= max - 1 && this.nextBatchProdLink != null) {
      //Do your action here
      console.log('reached bootm');
      this.getProduct
        .getNextBatchProduct(this.nextBatchProdLink)
        .subscribe((item) => {
          this.products = [...this.products, ...item.data.results];
          this.nextBatchProdLink = item.data.links.next;
        });
    }
    if (this.nextBatchProdLink == null) {
      this.prodEnd = true;
    }
  }
}
