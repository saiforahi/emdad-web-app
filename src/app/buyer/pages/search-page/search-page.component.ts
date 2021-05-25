import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  products: any = [];
  style: string;
  expandedSubCat: number;
  expandedCat: number;
  categories: any;
  prodInRow6: boolean;
  brands: any = [];
  sizes: any = [];
  prices: any = [];
  price = new FormControl(0);
  min_price: number;
  max_price: number;
  _brand: any;
  selected_brands: Array<any> = [];
  _size: any;
  selected_colors: Array<any> = [];
  _price: any;
  selected_price_ranges: Array<any> = [];
  price_slider_value:any;
  catMenuToggle: boolean = false;
  nextBatchProdLink: any;
  prodEnd: boolean;
  clear_selections:any
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.style = 'grid';
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.route.queryParams.subscribe((params) => {
      this.searchService.search(params.query).subscribe((item) => {
        console.log(item.data.results)
        this.products = item.data.results;
        this.get_menus();
        if (item.data.links != null) {
          this.nextBatchProdLink = item.data.links.next;
        }
      });
    });
    this.getCategories.category().subscribe((item) => {
      this.categories = item;
    });
    this.expandedCat = parseInt(localStorage.getItem('expandedCat'));
    this.expandedSubCat = parseInt(localStorage.getItem('expandedSubCat'));
    //
  }

  onPriceSliderChange(event) {
    this.selected_price_ranges = [];
    this.selected_price_ranges.push(this.min_price - 1 + ' ' + event.value);
    this._filter();
  }

  getProdOnFilter(ChildCatId, subCatId, catId) {
    this.router.navigate(['/products/category/', ChildCatId]);
  }

  get_menus() {
    this.brands=[]
    this.sizes=[]
    this.min_price = this.products[0].unit_price;
    this.max_price = this.products[0].unit_price;
    Array.from(this.products).forEach((product: any) => {
      if (this.min_price > parseFloat(product.unit_price)) {
        this.min_price = parseFloat(product.unit_price);
      }
      if (this.max_price < parseFloat(product.unit_price)) {
        this.max_price = parseFloat(product.unit_price);
      }
      if (product.brand !== null) {
        this.brands.push(product.brand);
      }
      if (product.size !== null) {
        this.sizes.push(product.size);
      }
    });
    this.brands = this.brands.filter(
      (value:any, index:any, array:Array<any>) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting brands
    this.sizes = this.sizes.filter(
      (value:any, index:any, array:Array<any>) =>
        array.findIndex((t) => t === value) === index
    ); //setting sizes
    this.prices = this.get_price_ranges();
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
    if (this.max_price > this.min_price) {
      let range = Math.trunc((this.max_price - this.min_price) / 3);
      let ranges = new Array();
      ranges.push({
        value:
          Math.trunc(this.min_price) -
          1 +
          ' ' +
          (Math.trunc(this.min_price) + range + 1),
        name:
          '$' +
          Math.trunc(this.min_price) +
          ' to $' +
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
      this.searchService
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
  }

  setColor(color_name: string, checked: boolean) {
    if (checked) {
      this.selected_colors.push(color_name);
      console.log('selected sizes', this.selected_colors);
      this._filter();
    } else {
      this.selected_colors = this.array_item_remover(
        color_name,
        this.selected_colors
      );
      console.log('selected sizes', this.selected_colors);
      this._filter();
    }
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

  _filter() {
    let query: string = '';
    if (this.selected_brands.length > 0) {
      query += '&brand=' + this.selected_brands.toString();
    }
    if (this.selected_colors.length > 0) {
      query += '&size=' + this.selected_colors.toString();
    }
    // if (this._price !== null &&this._price !== undefined &&this._price !== '') {
    //   query +='&min_price=' +this._price.split(' ')[0] +'&max_price=' +this._price.split(' ')[1];
    // }
    this.route.queryParams.subscribe((params) => {
      if (this.selected_price_ranges?.length > 0) {
        this.products = [];
        this.selected_price_ranges.forEach((range) => {
          let temp_query =
            query +
            '&min_price=' +
            range.split(' ')[0] +
            '&max_price=' +
            range.split(' ')[1];
          console.log('temp_query', 'search=' + params.query + temp_query);
          this.searchService
            .filter_products('search=' + params.query + temp_query)
            .subscribe((item) => {
              let temp=[]
              Array.from(item.data.results).forEach((item:any)=>{
                if(parseFloat(this.get_unit_price(item.commission,item.unit_price)) <= parseFloat(range.split(' ')[1])){
                  console.log(item.name)
                  temp.push(item)
                }
              })
              //this.products = [...this.products, ...temp];
              this.products = [...temp];
              console.log('products', this.products);
            });
        });
        window.scrollTo(0, 50);
      } else {
        console.log('query', 'search=' + params.query + query);
        this.searchService
          .filter_products('search=' + params.query + query)
          .subscribe((item) => {
            //this.products = [...this.products, ...item.data.results];
            this.products = [...item.data.results];
            console.log('products', this.products);
            window.scrollTo(0, 50);
          });
      }
    });
  }

  set_style(value: string) {
    this.style = value;
  }

  showCatMenu() {
    this.catMenuToggle = true;
  }

  closeCatMenu() {
    this.catMenuToggle = false;
  }

  reset_selections(event:any){
    console.log('clearing selections ..')
    this.get_menus()
    this.selected_brands=[]
    this.selected_colors=[]
    this.selected_price_ranges=[]
    console.log('brands',this.selected_brands)
  }

  get_unit_price(product_commission: any, price: any) {
    //generating unit price with commission
    
    let total = 0;
    if (parseFloat(product_commission) > 0) {
      let unit_price =
        parseFloat(price) * (parseFloat(product_commission) / 100);
      total = unit_price + parseFloat(price);
      //console.log('if total',total)
      //console.log('unit price',(parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price))
      //return (parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price)
    } else {
      let unit_price =
        parseFloat(price) *
        (parseFloat(localStorage.getItem('commission')) / 100);
      total = unit_price + parseFloat(price);
      //console.log('else total',total)
    }
    //console.log(total.toFixed(2))
    return ((total*(parseFloat(localStorage.getItem('vat'))/100))+total).toFixed(2);
  }
}
