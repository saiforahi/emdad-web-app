import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  colors: any = [];
  prices: any = [];
  price = new FormControl(0);
  min_price: number;
  max_price: number;
  _brand: any;
  _color: any;
  _price: any;
  price_slider_value;
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
        this.products = item.data.results;
        this.get_menus();
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
    let query: string = '';
    if (
      this._brand !== null &&
      this._brand !== undefined &&
      this._brand !== ''
    ) {
      query += 'brand=' + this._brand;
    }
    if (
      this._color !== null &&
      this._color !== undefined &&
      this._color !== ''
    ) {
      if (query.includes('brand')) {
        query += '&color=' + this._color;
      } else {
        query += 'color=' + this._color;
      }
    }
    if (
      this._price !== null &&
      this._price !== undefined &&
      this._price !== ''
    ) {
      if (query.includes('color') || query.includes('brand')) {
        query +=
          '&min_price=' +
          this._price.split(' ')[0] +
          '&max_price=' +
          this._price.split(' ')[1];
      } else {
        query +=
          'min_price=' +
          this._price.split(' ')[0] +
          '&max_price=' +
          this._price.split(' ')[1];
      }
    }
    console.log(query);
    this.route.queryParams.subscribe((params) => {
      this.searchService
        .filter_products('search=' + params.query + '&' + query)
        .subscribe((item) => {
          this.products = item.data.results;
        });
    });
  }
  getProdOnFilter(ChildCatId, subCatId, catId) {
    this.router.navigate(['/products/category/', ChildCatId]);
  }
  get_menus() {
    this.min_price = this.products[0].unit_price;
    this.max_price = this.products[0].unit_price;
    Array.from(this.products).forEach((product: any) => {
      if (this.min_price > product.unit_price) {
        this.min_price = product.unit_price;
      }
      if (this.max_price < product.unit_price) {
        this.max_price = product.unit_price;
      }
      if (product.brand !== null) {
        this.brands.push(product.brand);
      }
      if (product.color !== null) {
        this.colors.push(product.color);
      }
    });
    this.brands = this.brands.filter(
      (value, index, array) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting brands
    this.colors = this.colors.filter(
      (value, index, array) =>
        array.findIndex((t) => t.id === value.id) === index
    ); //setting colors
    this.prices = this.get_price_ranges();
  }
  get_price_ranges() {
    if(this.max_price>this.min_price){
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
  setBrand(brand_name) {
    this._brand = brand_name;
    this._filter();
  }
  setColor(color_name) {
    this._color = color_name;
    this._filter();
  }
  setPrice(price) {
    this._price = price;
    this._filter();
  }
  _filter() {
    let query: string = '';
    if (
      this._brand !== null &&
      this._brand !== undefined &&
      this._brand !== ''
    ) {
      query += 'brand=' + this._brand;
    }
    if (
      this._color !== null &&
      this._color !== undefined &&
      this._color !== ''
    ) {
      if (query.includes('brand')) {
        query += '&color=' + this._color;
      } else {
        query += 'color=' + this._color;
      }
    }
    if (
      this._price !== null &&
      this._price !== undefined &&
      this._price !== ''
    ) {
      if (query.includes('color') || query.includes('brand')) {
        query +=
          '&min_price=' +
          this._price.split(' ')[0] +
          '&max_price=' +
          this._price.split(' ')[1];
      } else {
        query +=
          'min_price=' +
          this._price.split(' ')[0] +
          '&max_price=' +
          this._price.split(' ')[1];
      }
    }
    console.log(query);
    this.route.queryParams.subscribe((params) => {
      this.searchService
        .filter_products('search=' + params.query + '&' + query)
        .subscribe((item) => {
          this.products = item.data.results;
        });
    });
  }
  set_style(value: string) {
    this.style = value;
  }
}
