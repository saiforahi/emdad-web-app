import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from '../../../shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../../shared/services/search.service';
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css'],
})
export class ProductListPageComponent implements OnInit {
  sellerId;
  style: string;
  isSeller = false;
  products: any = [];
  prodEnd;
  nextBatchProdLink;
  category: any;
  prevParam;
  prodInRow6;
  panelOpenState = true;
  categories: any;
  expandedCat;
  expandedSubCat;
  min_price: any;
  max_price: any;
  _brand: any;
  _color: any;
  _price: any;
  selected_child_category: any;
  selected_child_category_name: any;
  colors: any = [];
  brands:any=[];
  prices: any = [];
  sellerCat = [
    { "cat_name": "cat 3", "id": 2 },
    { "cat_name": "cat 6", "id": 3 },
    { "cat_name": "cat 4", "id": 4 },
    { "cat_name": "cat 2", "id": 5 }
  ]
  constructor(
    private getProduct: GetProductService,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.style = 'grid'
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.selected_child_category = this.route.snapshot.params['id'];
    this.getCategories.category().subscribe((item) => {
      // console.log(item);
      this.categories = item;
      this.categories.forEach(element => {
        element.children.forEach(element1 => {
          element1.children.forEach(element2 => {
            if (element2.id == this.selected_child_category) {
              this.selected_child_category_name=element2.name
              this.expandedSubCat=element1.id
              this.category = element
            }
          });
        });
      });
    });
    
    this.sellerId = this.route.snapshot.params['id'];
    // this.expandedCat = parseInt(localStorage.getItem("expandedCat"));
    // this.expandedSubCat = parseInt(localStorage.getItem("expandedSubCat"));
    // check for is seller ==>
    const getUrlStr = this.router.url;
    const newstr = getUrlStr.substr(10, 6);
    this.isSeller = newstr == 'seller' ? true : false;
    // if its not the seller-page then its the category page
    if (this.isSeller == true) {
      // get product by seller
      this.getProduct.getProductBySeller(this.sellerId).subscribe((item) => {
        this.products = item.data.results;
        this.nextBatchProdLink = item.data.links.next;
      });
    } else {
      // get product by category
      this.getProduct.getProductByCategory(this.selected_child_category).subscribe((item) => {
        this.products = item.data.results;
        this.get_menus();
        this.prices = this.get_price_ranges()
        this.nextBatchProdLink = item.data.links.next;
      });
    }
  }
  set_style(value: string) {
    this.style = value;
  }
  setBrand(brand_name){
    this._brand=brand_name
    this._filter()
  }
  setColor(color_name) {
    this._color = color_name
    this._filter()
  }
  setPrice(price) {
    this._price = price
    this._filter()
  }
  onSliderChange(event){
    let query: string = 'category=' + this.selected_child_category_name
    if (this._brand !== null && this._brand !== undefined && this._brand !== '') {
      query += '&brand=' + this._brand
    }
    if (this._color !== null && this._color !== undefined && this._color !== '') {
      query += '&color=' + this._color
    }
    console.log(query + '&min_price='+this.min_price+'&max_price='+event.value)
    this.searchService.filter_products(query + '&min_price='+this.min_price+'&max_price='+event.value).subscribe((item) => {
      this.products = item.data.results;
      console.log(this.products)
      this.get_menus()
    });
  }
  get_menus() { //setting menues from product list
    if (this.products.length > 0) {
      Array.from(this.products).forEach((product: any) => {
        if(product.color!==null){
          this.colors.push(product.color)
        }
        if(product.brand!==null){
          this.brands.push(product.brand)
        }
      })
      this._color=""
      this._brand=""
      this.brands=this.brands.filter((value,index,array)=>array.findIndex(t=>(t.id === value.id))===index) //setting brands
      this.colors = this.colors.filter((value, index, array) => array.findIndex(t => (t.id === value.id)) === index) //setting colors
    }
  }
  getProdOnFilter(ChildCatId, subCatId, catId, ChildCatName) {
    this.router.navigate(['/products/category/', ChildCatId]);
  }
  get_price_ranges() {
    this.min_price = this.products[0].unit_price;
    this.max_price = this.products[0].unit_price;
    Array.from(this.products).forEach((product: any) => {
      if (this.min_price > product.unit_price) {
        this.min_price = product.unit_price
      }
      if (this.max_price < product.unit_price) {
        this.max_price = product.unit_price
      }
    })
    if (this.max_price !== this.min_price) {
      let range = Math.trunc((this.max_price - this.min_price) / 3)
      let ranges = new Array()
      ranges.push({ value: (Math.trunc(this.min_price) - 1) + ' ' + ((Math.trunc(this.min_price) + range + 1)), name: '$' + Math.trunc(this.min_price) + ' to $' + (Math.trunc(this.min_price) + range) })
      ranges.push({ value: (Math.trunc(this.min_price) + range - 1) + ' ' + (Math.trunc(this.min_price) + (range * 2) + 1), name: '$' + (Math.trunc(this.min_price) + range) + ' to $' + (Math.trunc(this.min_price) + (range * 2)) })
      ranges.push({ value: (Math.trunc(this.min_price) + (range * 2) - 1) + ' ' + (Math.trunc(this.max_price) + 1), name: '$' + (Math.trunc(this.min_price) + (range * 2)) + ' to $' + Math.trunc(this.max_price) })
      return ranges;
    }
  }
  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
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
      // this.openSnackBar('No more product to show!', 'OK');
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  _filter() {
    let query: string = ''
    if (this._brand !== null && this._brand !== undefined && this._brand !== '') {
      query += '&brand=' + this._brand
    }
    if (this._color !== null && this._color !== undefined && this._color !== '') {
      query += '&color=' + this._color
    }
    if (this._price !== null && this._price !== undefined && this._price !== '') {
      query += '&min_price=' + this._price.split(" ")[0] + '&max_price=' + this._price.split(" ")[1]
    }
    console.log('category=' + this.selected_child_category_name +query)
    this.searchService.filter_products('category=' + this.selected_child_category_name +  query).subscribe((item) => {
      this.products = item.data.results;
      console.log(this.products)
      this.get_menus()
    });
  }
}
