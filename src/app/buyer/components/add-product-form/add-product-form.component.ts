import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AddProductService } from 'src/app/shared/services/add-product.service';

import { GetCategoryService } from '../../../shared/services/get-category.service';

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
  isSubmitted: boolean;
  image1: any;
  image2: any;
  attachment: any;
  unitList: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: GetCategoryService,
    private addProductService: AddProductService
  ) {
    this.formProductData = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('', Validators.required),
      unit_price: new FormControl('', Validators.required),
      delivery_method: new FormControl('', Validators.required),
      ddp_lead_time: new FormControl('', Validators.required),
      ex_works_lead_time: new FormControl('', Validators.required),
      commission: new FormControl('', Validators.required),
      stock_quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      brand_id: new FormControl('', Validators.required),
      seller: new FormControl('', Validators.required),
      image1: new FormControl(''),
      image2: new FormControl(''),
      status: new FormControl('', Validators.required),
      attachment: new FormControl('', Validators.required),
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
    this.formProductData.value.seller = this.userId;
    this.formProductData.value.image1 = this.image1;
    this.formProductData.value.image2 = this.image2;
    this.formProductData.value.attachment = this.attachment;
    this.isSubmitted = true;
    // if form is valid
    // sending data to the page
    console.log(this.formProductData.valid);
    console.log('***');
    console.log(this.formProductData.value);
    this.addProduct.emit(this.formProductData.value);
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

  onImage1Change(event) {
    this.image1 = event.target.files[0];
  }

  onImage2Change(event) {
    this.image2 = event.target.files[0];
  }

  onAttachmentChange(event) {
    this.attachment = event.target.files;
  }
}
