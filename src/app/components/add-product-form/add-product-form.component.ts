import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { GetCategoryService } from '../../shared/services/get-category.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css'],
})
export class AddProductFormComponent implements OnInit {
  formProductData: any;
  formCategories: any;
  formSubCategories: any;
  formSubSubCategories: any;
  selectedCategory: any;
  selectedSubCategory: any;
  selectedSubSubCategory: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: GetCategoryService
  ) {
    this.formProductData = this.formBuilder.group({
      name: '',
      slug: '',
      description: '',
      category_id: '',
      unit_price: '',
      delivery_method: '',
      ddp_lead_time: '',
      ex_works_lead_time: '',
      commission: '',
      stock_quantity: '',
      unit_id: '',
      color: '',
      brand_id: '',
      seller_id: '',
      image1: '',
      image2: '',
      status: '',
      attachment: [],
    });
  }

  @Input() userId;
  @Output() addProduct = new EventEmitter<any>();

  ngOnInit(): void {
    this.categoryService
      .category()
      .subscribe((items) => (this.formCategories = ['', ...items]));
  }

  onSubmit() {
    let slug = this.generateSlug(this.formProductData.value.name);
    this.formProductData.value.slug = slug;
    this.formProductData.value.seller_id = this.userId;
    // console.log(this.formProductData.value);
    // sending data to the page
    this.addProduct.emit(this.formProductData);
  }

  generateSlug(name: string) {
    let slug = name.toLowerCase().split(' ').join('-');
    return slug;
  }

  onCategoryChange(id) {
    this.selectedCategory = id;
    let subCategories = this.formCategories.filter((cat) => {
      if (cat.id == this.selectedCategory) return cat;
    });
    this.formSubCategories = [''];
    subCategories.forEach((sc) => this.formSubCategories.push(...sc.children));
    // console.log(this.formSubCategories);
  }

  onSubCategoryChange(id) {
    this.selectedSubCategory = id;
    let subSubCategories = this.formSubCategories.filter((cat) => {
      if (cat.id == this.selectedSubCategory) return cat;
    });
    this.formSubSubCategories = [''];
    subSubCategories.forEach((ssc) =>
      this.formSubSubCategories.push(...ssc.children)
    );
    // console.log(this.formSubSubCategories);
  }
}
