import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from '../../../shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../../shared/services/search.service';
import { config } from 'src/config';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css'],
})
export class ProductListPageComponent implements OnInit {
  sellerId;
  style: string = 'grid';
  @Output() view_style = new EventEmitter<string>();
  isSeller = false;
  isCategories = false;
  products = [];
  prodEnd;
  nextBatchProdLink;
  category: any;
  prevParam;
  prodInRow6;
  panelOpenState = true;
  categories: Array<any> = [];
  expandedCat;
  expandedSubCat;
  min_price: number;
  max_price: number;
  _brand: any;
  _size: any;
  brands: any = [];
  selected_brands: Array<string> = [];
  selected_colors: Array<string> = [];
  sizes: any = [];
  prices: any = [];
  catMenuToggle = false;
  selected_child_category: any;
  selected_child_category_name: any;
  filteredCatArray: any = [];
  selected_price_ranges: Array<any> = [];
  selected_price_range:any
  store_name:string
  img_base_url = config.img_base_url
  random_cat:Array<any>
  sellerProPic: any;
  sellerLogo: any;
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
    this.style = 'grid';
    window.scrollTo(0, 0);
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.route.queryParams.subscribe((params) => {
      if(params.store_name!==undefined){
        this.store_name=params.store_name
      }
    })
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
        console.log('seller products',item.data)
        this.sellerProPic=item.data.results[0].seller.store_pic;
        this.sellerLogo=item.data.results[0].seller.profile_pic;
        this.products = item.data.results;
        this.set_seller_categories(this.products);
        this.get_menus();
        this.prices = this.get_price_ranges();
        if (item.data.links != null) {
          this.nextBatchProdLink = item.data.links.next;
        }
      });
    } else if (this.selected_child_category !== undefined) {
      // get product by category
      this.getProduct
        .getProductByCategory(this.selected_child_category)
        .subscribe((item) => {
        console.log(item)
          this.products = item.data.results;
          if (item.data.links != null) {
            this.nextBatchProdLink = item.data.links.next;
          }
          this.getCategories.category().subscribe((item) => {
            item.forEach((element) => {
              element.children.forEach((element1) => {
                element1.children.forEach((element2) => {
                  if (element2.id == this.selected_child_category) {
                    this.selected_child_category_name = element2.name;
                    this.expandedSubCat = element1.id;
                    this.category = element;
                    console.log('category',this.category)
                  }
                });
              });
            });
            this.get_menus();
            this.prices = this.get_price_ranges();
          });
        });
    } else if (this.router.url.substr(10, 10) == 'categories') {
      this.isCategories = true;
      this.set_all_categories();
      console.log('categories', this.categories);
      this.getProduct.popularProduct().subscribe((products) => {
        console.log('products',products.data.results)
        this.products = products.data.results;
        console.log('popular products', this.products);
        this.get_menus();
        this.prices = this.get_price_ranges();
        if (products.data.links != null) {
          this.nextBatchProdLink = products.data.links.next;
        }
      });
      console.log(this.categories);
    }
  }

  set_all_categories() {
    //setting categories for products/categories route
    this.categories = [];
    this.getCategories.category().subscribe((item) => {
      this.categories = item;
      // item.forEach((element) => {
      //   this.categories.push(element)
      // });
    });
  }

  filterChildCat(categoryArray) {
    this.filteredCatArray = [];
    categoryArray.forEach((element) => {
      element.children.forEach((element) => {
        element.children.forEach((element) => {
          this.filteredCatArray.push(element);
        });
      });
    });
    console.log('filtered array', this.filteredCatArray);
  }

  set_seller_categories(products: Array<any>) {
    //setting categories for seller wise products view
    this.categories = [];
    let temp_categories: Array<any> = [];
    products.forEach((product) => {
      temp_categories.push(product.category);
    });
    console.log('categories from products', temp_categories);
    temp_categories = temp_categories.filter(
      (category, index, temp_categories) =>
        temp_categories.findIndex((t) => t.id === category.id) === index
    );
    console.log('categories from products after filter', temp_categories);
    this.getCategories.category().subscribe((item) => {
      console.log('items from api', item);
      item.forEach((element) => {
        element.children.forEach((element1) => {
          element1.children.forEach((element2) => {
            temp_categories.forEach((category) => {
              if (category.id == element2.id) {
                let exists = false;
                this.categories.forEach((cat) => {
                  if (cat.id == element.id) {
                    exists = true;
                  }
                });
                if (!exists) {
                  this.categories.push(element);
                }
              }
            });
          });
        });
      });
      this.filterChildCat(this.categories);
    });
    this.random_cat=this.random_categories(this.filteredCatArray)
    console.log('random',this.random_cat)
    // console.log('categories from products after filter',this.categories)
  }

  set_style(value: string) {
    //setting product card style grid/list
    this.style = value;
  }

  setBrand(brand_name: string, checked: boolean) {
    if (checked) {
      this.selected_brands.push(brand_name);
      console.log('selected brands', this.selected_brands);
      this._filter();
    } else {
      this.selected_brands = this.array_item_remover(
        brand_name,
        this.selected_brands
      );
      console.log('selected brands', this.selected_brands);
      this._filter();
    }
    // if(brand_name?.length>0){
    //   this._brand = brand_name;
    //   this.selected_brands.push(brand_name)
    //   this._filter();
    // }
    // else{
    //   this._brand=""
    //   this._filter();
    // }
  }

  setColor(color_name: string, checked: boolean) {
    if (checked) {
      this.selected_colors.push(color_name);
      console.log('selected colors', this.selected_colors);
      this._filter();
    } else {
      this.selected_colors = this.array_item_remover(
        color_name,
        this.selected_colors
      );
      console.log('selected colors', this.selected_colors);
      this._filter();
    }
    // if(color_name?.length>0){
    //   this._size = color_name;
    //   this._filter();
    // }
    // else{
    //   this._size=""
    //   this._filter();
    // }
  }

  setPrice(price: string, checked: boolean) {
    if (checked) {
      this.selected_price_ranges.push(price);
      // console.log(this.selected_price_ranges)
      this._filter();
    } else {
      this.selected_price_ranges = this.array_item_remover(
        price,
        this.selected_price_ranges
      );
      //console.log(this.selected_price_ranges)
      this._filter();
    }
  }

  array_item_remover(item: string, array: Array<string>): Array<string> {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === item) {
        delete array[index];
      }
    }
    let temp = [];
    for (let i of array) {
      i && temp.push(i); // copy each non-empty value to the 'temp' array
    }
    array = temp;
    return array;
  }

  get_menus() {
    //setting menus from product list
    this.brands = [];
    this.sizes = [];
    Array.from(this.products).forEach((product: any) => {
      if (product.size !== null) {
        this.sizes.push(product.size);
      }
      if (product.brand !== null) {
        this.brands.push(product.brand);
      }
    });
    this._size = '';
    this._brand = '';
    this.brands = this.brands.filter(
      (value, index, array) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting brands
    this.sizes = this.sizes.filter(
      (value, index, array) =>
        array.findIndex((t) => t === value) === index
    ); //setting colors
    this.getProduct.getBrands().subscribe((success) => {
      console.log('brand list', success.data);
      this.brands = success.data[0];
    });
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
      if (parseInt(product.unit_price) >= this.max_price) {
        this.max_price = parseInt(product.unit_price);
      }
    });
    console.log('max', this.max_price);
    console.log('min', this.min_price);
    if (this.max_price != this.min_price) {
      let range = Math.trunc((this.max_price - this.min_price) / 3);
      let ranges = new Array();
      ranges.push({
        value:
          Math.trunc(this.min_price) -
          1 +
          ' ' +
          (Math.trunc(this.min_price) + range + 1),
        name:
          'SAR ' +
          Math.trunc(this.min_price) +
          ' to SAR ' +
          (Math.trunc(this.min_price) + range),
      });
      ranges.push({
        value:
          Math.trunc(this.min_price) +
          range -
          1 +
          ' ' +
          (Math.trunc(this.min_price) + range * 2 + 1),
        name:
          'SAR ' +
          (Math.trunc(this.min_price) + range) +
          ' to SAR ' +
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
          'SAR ' +
          (Math.trunc(this.min_price) + range * 2) +
          ' to SAR ' +
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
          this.get_menus();
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
    this.selected_price_ranges = [];
    this.selected_price_ranges.push(this.min_price - 1 + ' ' + event.value);
    this._filter();
  }

  _filter() {
    let query: string = '';
    if (!this.isCategories && !this.isSeller) {
      query = 'category=' + this.selected_child_category_name;
    }
    // else if(this.isSeller){
    //   query= 'seller='+this.sellerId
    // }
    else {
      query = '';
    }
    // if (this._brand !== null && this._brand !== undefined && this._brand !== '') {
    //   query += '&brand=' + this._brand;
    // }
    if (this.selected_brands.length > 0) {
      query += '&brand=' + this.selected_brands.toString();
    }
    if (this.selected_colors.length > 0) {
      query += '&size=' + this.selected_colors.toString();
    }
    // if (this._size !== null && this._size !== undefined && this._size !== '') {
    //   query += '&color=' + this._size;
    // }
    // if (this._price.min<this._price.max) {
    //   query += '&min_price=' + this._price.min + '&max_price=' + this._price.max;
    // }
    this.products = [];
    if (this.selected_price_ranges?.length > 0) {
      this.selected_price_ranges.forEach((range) => {
        let temp_query =
          query +
          '&min_price=' +
          range.split(' ')[0] +
          '&max_price=' +
          range.split(' ')[1];
        console.log(temp_query);
        if (this.isSeller) {
          this.searchService
            .sellerwise_filter_products(temp_query, this.sellerId)
            .subscribe((item) => {
              this.products = [...this.products, ...item.data.results];
              window.scrollTo(0, 0);
              //this.get_menus();
            });
        } else {
          this.searchService.filter_products(temp_query).subscribe((item) => {
            console.log('products from res', item.data.results);
            this.products = [...this.products, ...item.data.results];
            console.log('products', this.products);
            window.scrollTo(0, 0);
            //this.get_menus();
          });
        }
        return;
      });
    } else {
      if (this.isSeller) {
        this.searchService
          .sellerwise_filter_products(query, this.sellerId)
          .subscribe((item) => {
            this.products = item.data.results;
            window.scrollTo(0, 350);
            //this.get_menus();
          });
      } else {
        this.searchService.filter_products(query).subscribe((item) => {
          console.log('products from res', item.data.results);
          this.products = item.data.results;
          console.log('products', this.products);
          window.scrollTo(0, 350);
          //this.get_menus();
        });
      }
    }
    // console.log('query: ',query);
    // if(this.isSeller){
    //   this.searchService.sellerwise_filter_products(query,this.sellerId).subscribe((item) => {
    //     this.products = item.data.results;
    //     window.scrollTo(0, 0);
    //     //this.get_menus();
    //   });
    // }
    // else{
    //   this.searchService.filter_products(query).subscribe((item) => {
    //     this.products = item.data.results;
    //     window.scrollTo(0, 0);
    //     //this.get_menus();
    //   });
    // }
  }

  showCatMenu() {
    this.catMenuToggle = true;
  }

  closeCatMenu() {
    this.catMenuToggle = false;
  }

  random_categories(categories:Array<any>){
    let temp:Array<any>=[]
    while(temp.length<7){
      temp.push(categories[Math.floor(Math.random() * categories.length)])
    }
    return temp
  }
}
