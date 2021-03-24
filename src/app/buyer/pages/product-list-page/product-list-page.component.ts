import { Component, EventEmitter, OnChanges,SimpleChanges, OnInit, Output } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from '../../../shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../../shared/services/search.service';

interface PriceRange{
  min:number;
  max:number
}

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css'],
})
export class ProductListPageComponent implements OnInit {
  sellerId;
  style: string='grid';
  @Output() view_style=new EventEmitter<string> ()
  isSeller = false;
  isCategories = false;
  products = [];
  prodEnd;
  nextBatchProdLink;
  category: any;
  prevParam;
  prodInRow6;
  panelOpenState = true;
  categories: Array<any>=[];
  expandedCat;
  expandedSubCat;
  min_price: number;
  max_price: number;
  _brand: any;
  _color: any;
  _price: PriceRange={
    min:0,
    max:0
  };
  brands: any = [];
  colors: any = [];
  prices: any = [];
  catMenuToggle = false;
  selected_child_category: any;
  selected_child_category_name: any;
  filteredCatArray: any = [];

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
    this.style = 'grid';
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.selected_child_category = this.route.snapshot.params['id'];
    this.sellerId = this.route.snapshot.params['id'];
    // this.expandedCat = parseInt(localStorage.getItem("expandedCat"));
    // this.expandedSubCat = parseInt(localStorage.getItem("expandedSubCat"));
    // check for is seller ==>
    const getUrlStr = this.router.url;
    const newstr = getUrlStr.substr(10, 6);
    this.isSeller = newstr == 'seller' ? true : false;
    // <==
    // if its not the seller-page then its the category page
    if (this.isSeller == true) {
        // get product by seller
        this.getProduct.getProductBySeller(this.sellerId).subscribe((item) => {
        this.products = item.data.results;
        this.set_seller_categories(this.products)
        this.get_menus();
        this.prices = this.get_price_ranges();
        if(item.data.links!=null){
          this.nextBatchProdLink = item.data.links.next;
        }
      });
    } 
    else if(this.selected_child_category!==undefined) {
      // get product by category
      this.getProduct
        .getProductByCategory(this.selected_child_category)
        .subscribe((item) => {
          this.products = item.data.results;
          this.getCategories.category().subscribe((item) => {
            item.forEach((element) => {
              element.children.forEach((element1) => {
                element1.children.forEach((element2) => {
                  if (element2.id == this.selected_child_category) {
                    this.selected_child_category_name = element2.name;
                    this.expandedSubCat = element1.id;
                    this.category = element;
                  }
                });
              });
            });
            this.get_menus();
            this.prices = this.get_price_ranges();
            if(item.data.links!=null){
              this.nextBatchProdLink = item.data.links.next;
            }
          });
          
        });
    }
    else if(this.router.url.substr(10,10)=='categories'){
      this.isCategories=true
      this.set_all_categories()
      console.log('categories',this.categories)
      this.getProduct.popularProduct().subscribe((products)=>{
        this.products=products.data.results
        console.log('popular products',this.products)
        this.get_menus()
        this.prices = this.get_price_ranges();
        if(products.data.links!=null){
          this.nextBatchProdLink = products.data.links.next;
        }
      })
      console.log(this.categories)
    }
  }

  set_all_categories(){ //setting categories for products/categories route
    this.categories=[]
    this.getCategories.category().subscribe((item) => {
      this.categories=item;
      // item.forEach((element) => {
      //   this.categories.push(element)
      // });
    });
  }

  filterChildCat(categoryArray){
    this.filteredCatArray = [];
    categoryArray.forEach(element => {
      element.children.forEach(element => {
        element.children.forEach(element => {
          this.filteredCatArray.push(element);
        });
      });
    });
    console.log("filtered array", this.filteredCatArray)
  }

  set_seller_categories(products:Array<any>){ //setting categories for seller wise products view
    this.categories=[]
    let temp_categories:Array<any>=[]
    products.forEach(product=>{
      temp_categories.push(product.category)
    })
    console.log('categories from products',temp_categories)
    temp_categories = temp_categories.filter(
      (category, index, temp_categories) =>
      temp_categories.findIndex((t) => t.id === category.id) === index
    );
    console.log('categories from products after filter',temp_categories)
    this.getCategories.category().subscribe((item) => {
      console.log('items from api',item)
      item.forEach((element) => {
        element.children.forEach((element1) => {
          element1.children.forEach((element2) => {
            temp_categories.forEach(category=>{
              if(category.id==element2.id){
                let exists=false;
                this.categories.forEach(cat => {
                  if(cat.id==element.id){
                    exists=true
                  }
                });
                if(!exists){
                  this.categories.push(element)
                }
              }
            })
          });
        });
      });
      this.filterChildCat(this.categories);
    });
    // console.log('categories from products after filter',this.categories)
  }
  set_style(value: string) { //setting product card style grid/list
    this.style = value;
  }

  setBrand(brand_name:string) {
    if(brand_name?.length>0){
      this._brand = brand_name;
      this._filter();
    }
    else{
      this._filter();
    }
  }

  setColor(color_name:string) {
    if(color_name?.length>0){
      this._color = color_name;
      this._filter();
    }
    else{
      this._filter();
    }
  }

  setPrice(price:string) {
    if(price?.length>0){
      this._price.min = parseInt(price.split(' ')[0]);
      this._price.max = parseInt(price.split(' ')[1]);
      this._filter();
    }
    else{
      this._price.min = this.min_price-1;
      this._price.max = this.max_price+1;
      this._filter();
    }
  }

  get_menus() { //setting menus from product list
    this.brands=[]
    this.colors=[]
    Array.from(this.products).forEach((product: any) => {
      if (product.color !== null) {
        this.colors.push(product.color);
      }
      if (product.brand !== null) {
        this.brands.push(product.brand);
      }
    });
    this._color = '';
    this._brand = '';
    this.brands = this.brands.filter(
      (value, index, array) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting brands
    this.colors = this.colors.filter(
      (value, index, array) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting colors
  }

  getProdOnFilter(ChildCatId, subCatId, catId, ChildCatName) {
    // this.style = 'grid';
    this.router.navigate(['/products/category/', ChildCatId]);
  }

  get_price_ranges() {
    this.min_price = parseInt(this.products[0].unit_price);
    this.max_price = parseInt(this.products[0].unit_price);
    Array.from(this.products).forEach((product: any) => {
      if (this.min_price > parseInt(product.unit_price)) {
        this.min_price = parseInt(product.unit_price);
      }
      if ( parseInt(product.unit_price) >= this.max_price ) {
        this.max_price = parseInt(product.unit_price);
      }
    });
    console.log('max',this.max_price)
    console.log('min',this.min_price)
    if (this.max_price != this.min_price) {
      let range = Math.trunc((this.max_price - this.min_price) / 3);
      let ranges = new Array();
      ranges.push({value:Math.trunc(this.min_price) -1 +' ' +(Math.trunc(this.min_price) + range + 1),name:'$' +Math.trunc(this.min_price) +' to $' +(Math.trunc(this.min_price) + range)});
      ranges.push({
        value:
          Math.trunc(this.min_price) +
          range -
          1 +
          ' ' +
          (Math.trunc(this.min_price) + range * 2 + 1),
        name:
          '$' +
          (Math.trunc(this.min_price) + range) +
          ' to $' +
          (Math.trunc(this.min_price) + range * 2),
      });
      ranges.push({
        value:
          Math.trunc(this.min_price) +
          range * 2 -
          1 +
          ' ' +
          (Math.trunc(this.max_price) + 1),
        name:
          '$' +
          (Math.trunc(this.min_price) + range * 2) +
          ' to $' +
          Math.trunc(this.max_price),
      });
      return ranges;
    }
  }

  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
      //Do your action here
      console.log('reached bootm');
      this.getProduct
        .getNextBatchProduct(this.nextBatchProdLink)
        .subscribe((item) => {
          this.products = [...this.products, ...item.data.results];
          this.get_menus()
          this.prices = this.get_price_ranges();
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

  onPriceSliderChange(event) {
    this._price.min=this.min_price-1
    this._price.max=event.value
    this._filter()
  }

  _filter() {
    let query: string = '';
    
    if(!this.isCategories && !this.isSeller){
      query = 'category=' + this.selected_child_category_name;
    }
    // else if(this.isSeller){
    //   query= 'seller='+this.sellerId
    // }
    else{
      query=''
    }
    if (this._brand !== null && this._brand !== undefined && this._brand !== '') {
      query += '&brand=' + this._brand;
    }
    if (this._color !== null && this._color !== undefined && this._color !== '') {
      query += '&color=' + this._color;
    }
    if (this._price.min<this._price.max) {
      query += '&min_price=' + this._price.min + '&max_price=' + this._price.max;
    }
    console.log('query: ',query);
    this.searchService.filter_products(query).subscribe((item) => {
      this.products = item.data.results;
      window.scrollTo(0, 0);
      //this.get_menus();
    });
  }

  showCatMenu() {
    this.catMenuToggle = true;
  }

  closeCatMenu() {
    this.catMenuToggle = false;
  }
}
