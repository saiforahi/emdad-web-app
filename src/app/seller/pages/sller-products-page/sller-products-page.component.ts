import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogueComponent } from './dialogue/dialogue.component';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { AddProductService } from 'src/app/shared/services/add-product.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ProdCategoryFilterComponent } from './prod-category-filter/prod-category-filter.component';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-sller-products-page',
  templateUrl: './sller-products-page.component.html',
  styleUrls: ['./sller-products-page.component.css'],
})
export class SllerProductsPageComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav1') sidenav: any;
  sideMenuCollapsed = false;
  loggedInUser = true;
  screenWidth: number;
  mode:any;
  isOpened:boolean;
  catMenuToggle = false;

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

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService,
    public dialog: MatDialog,
    private productService: GetProductService,
    private deleteProductService: AddProductService,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    private addProductService: AddProductService,
    private spinner: NgxSpinnerService,
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
    // subscribe to route event for route param change
    // router.events.subscribe((val: any) => {
    //   if (val.url) {
    //     // split soute with '/'
    //     this.activeRoute = val.url.split('/');
    //     // check if route param value changed or not
    //     if (this.categoryId != undefined) {
    //       if (this.activeRoute[5] != this.categoryId) {
    //         // set carrent cat id of route param
    //         this.categoryId = this.activeRoute[5];
    //         // get prducts for given product cat id
    //         this.ngOnInit()
    //       }
    //     } else {
    //       this.expandedCat = null;
    //       this.expandedSubCat = null;
    //       this.ngOnInit()
    //     }
    //   }
    // });


/*     this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  } */
}

/*   isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1199) {
        this.isOpened == true;
        this.mode== 'side';
    } else if (width <= 1199) {
      this.isOpened == false;
      this.mode == 'over';
    
    }
  } */

  ngOnInit(): void {
/*     const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 1199) {
        this.isOpened = true;
        this.mode= 'side';
        this.hasBackdrop= false;
    } else if(width <= 1199) {
      this.isOpened = false;
      this.mode = 'over';
      this.hasBackdrop= true;
    } */
    // get current param in route
    this.categoryId = this.route.snapshot.params['id'];
    // split soute with '/'
    this.activeRoute = this.router.url.split('/');
    // get seller owned category
    this.getCategories
      .categoriesOfSeller(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        console.log("item",item);
        this.categories = item.data[0].category_info;
      });
    // filter products for given cat id in route
    if (this.categoryId != undefined) {
      this.getSellerProductByCategory(this.categoryId);
    } else {
      this.getSellerAllProduct();
    }
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

  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
      //Do your action here
      // console.log('reached bootm');
      this.productService
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

  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f9f9f9';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.selection.selected.forEach(item => {
          console.log(item.id)
          this.deleteProductService.deleteProduct(item.id).subscribe((success: any) => {
            console.log(success.message);
            this.selection.clear();
            swal('Success!', 'Product deleted succssfully', 'success');
            if (this.categoryId != undefined) {
              this.getSellerProductByCategory(this.categoryId);
            } else {
              this.getSellerAllProduct();
            }
          },
          (error: any) => {
            console.log(error);
          })
        });
      }
    });
  }

  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.products.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.products.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  dleteProduct(){
    this.selection.selected.forEach(s => console.log(s.id));
  }
  
  showCatMenu() {
    this.catMenuToggle = true;
  }

  closeCatMenu() {
    this.catMenuToggle = false;
  }
  deleteProduct(id){
    this.spinner.show();
    this.addProductService.deleteProduct(id).subscribe((success: any) => {
      console.log(success.message);
      this.router.navigate(['/dashboard/products'])
      this.spinner.hide();
      swal('Success!', 'Product deleted succssfully', 'success');
    },
    (error: any) => {
      console.log(error);
    })
  }
}
