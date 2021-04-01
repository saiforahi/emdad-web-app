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

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
// ];

@Component({
  selector: 'app-sller-products-page',
  templateUrl: './sller-products-page.component.html',
  styleUrls: ['./sller-products-page.component.css'],
})
export class SllerProductsPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav') sidenav: any;
  sideMenuCollapsed = false;
  loggedInUser = true;
  displayedColumns: string[] = [
    'Product Name',
    'Stock',
    'Unit of Measurement',
    'Unite Price',
    'Delivery Method',
    'select',
    'edit',
  ];
  resultsLength = [];
  expandedSubCat: number;
  expandedCat: number;
  categories: any;
  categoryId: any;
  products: any = [];
  // dataSource = new MatTableDataSource<any>(this.products);
  selection = new SelectionModel<any>(true, []);
  activeRoute: string[];
  directoryString = 'All';

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService,
    public dialog: MatDialog,
    private productService: GetProductService,
    private deleteProductService: AddProductService
  ) {
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
        // console.log(item);
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
        console.log(item);
      });
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
}
