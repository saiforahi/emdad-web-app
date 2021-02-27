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
  products: any=[];
  expandedSubCat: number;
  expandedCat: number;
  categories: any;
  prodInRow6: boolean;
  brands:any=[];
  colors:any=[];
  price= new FormControl(0)
  min_price:any;
  max_price:any;
  _brand:any;
  _color:any;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.route.queryParams.subscribe((params) => {
      this.searchService.search(params.query).subscribe((item) => {
        this.products = item.data.results;
        console.log('products',this.products)
        this.get_menus();
      });
    });
    this.getCategories.category().subscribe((item) => {
      console.log(item);
      this.categories = item;
    });
    this.expandedCat = parseInt(localStorage.getItem('expandedCat'));
    this.expandedSubCat = parseInt(localStorage.getItem('expandedSubCat'));
    //
  }

  getProdOnFilter(ChildCatId, subCatId, catId) {
    this.router.navigate(['/products/category/', ChildCatId]);
    localStorage.setItem('expandedSubCat', subCatId);
    localStorage.setItem('expandedCat', catId);
  }

  get_menus(){
    let min_price=this.products[0].unit_price;
    Array.from(this.products).forEach((product:any)=>{
      if(min_price>product.unit_price){
        min_price=product.unit_price
      }
      this.brands.push(product.brand)
      this.colors.push(product.color)
    })
    this.min_price=min_price;
    console.log('min',this.min_price)
    this.brands=this.brands.filter((value,index,array)=>array.findIndex(t=>(t.id === value.id))===index) //setting brands
    this.colors=this.colors.filter((value,index,array)=>array.findIndex(t=>(t.id === value.id))===index) //setting colors
    console.log('brands',this.brands)
    console.log('colors',this.colors)
  }
  set_prices(){
    let price=0;
    this.products.forEach(product => {
      
    });
  }
  setBrand(brand_name){
    this._brand=brand_name
    this._filter()
  }
  setColor(color_name){
    this._color=color_name
    this._filter()
  }
  _filter(){
    let query=''
    if(this._brand!==null && this._brand!==undefined && this._brand!==''){
      query+='brand='+this._brand
    }
    if(this._color!==null && this._color!==undefined && this._color!==''){
      query+='&color='+this._color
    }
    console.log(query)
    this.route.queryParams.subscribe((params) => {
      this.searchService.filter_products('search='+params.query+'&'+query).subscribe((item) => {
        this.products = item.data.results;
      });
    });
    // this.searchService.filter_products('search='+query).subscribe((result)=>{
    //   this.products=result.data.results
    //   console.log(this.products)
    // })
  }
}
