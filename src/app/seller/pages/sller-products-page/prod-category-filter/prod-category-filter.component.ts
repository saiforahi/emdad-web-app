import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
@Component({
  selector: 'app-prod-category-filter',
  templateUrl: './prod-category-filter.component.html',
  styleUrls: ['./prod-category-filter.component.css']
})
export class ProdCategoryFilterComponent implements OnInit {
categoriesData:any;
resultsLength = [];
expandedSubCat: number = null;
expandedCat: number;
categories: any;
categoryId: any;
products: any = [];
// dataSource = new MatTableDataSource<any>(this.products);
selection = new SelectionModel<any>(true, []);
activeRoute: string[];
directoryString = 'All';
nextBatchProdLink: any;
prodEnd: boolean = false;
  sideMenuCollapsed: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService,
    private productService: GetProductService,
   
  ) {
    
   }

  ngOnInit(): void {
     // get current param in route
     this.categoryId = this.route.snapshot.params['id'];
     // split soute with '/'
     this.activeRoute = this.router.url.split('/');
     // get seller owned category
     this.getCategories
       .categoriesOfSeller(localStorage.getItem('s_uid'))
       .subscribe((item: any) => {
         console.log(item);
         this.categories = item.data[0].category_info;
       });
     // filter products for given cat id in route
     if (this.categoryId != undefined) {
       this.getSellerProductByCategory(this.categoryId);
     } else {
       this.getSellerAllProduct();
     }
  }
  getSellerProductByCategory(catId) {
    // set active state of cat menu item
    this.expandedCat = parseInt(localStorage.getItem('expandedCat'));
    this.expandedSubCat = parseInt(localStorage.getItem('expandedSubCat'));
    this.productService
      .sellersProductByCategory(localStorage.getItem('s_uid'), catId)
      .subscribe((item: any) => {
        this.products = item.data[0];
        console.log(item);
      });
  }
  getSellerAllProduct() {
    // set active state of cat menu item
    this.expandedCat = null;
    this.expandedSubCat = null;
    this.productService
      .getProductBySeller(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        this.products = item.data.results;
        this.nextBatchProdLink = item.data.links.next;
        if (this.nextBatchProdLink == null) {
          this.prodEnd = true;
        }
        console.log(item);
      });
  }
  getProdOnFilter(ChildCatId, ChildCatName, subCatId, subCatName, catId, catName) {
    // this.router.navigate([
    //   '/dashboard/products/category/',
    //   localStorage.getItem('s_uid'),
    //   ChildCatId,
    // ]);
    localStorage.setItem('expandedSubCat', subCatId);
    localStorage.setItem('expandedCat', catId);
    this.getSellerProductByCategory(ChildCatId);
    this.directoryString = catName+" / "+subCatName+" / "+ChildCatName;
  }
  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }
}
