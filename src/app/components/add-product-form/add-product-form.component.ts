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
  isSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: GetCategoryService
  ) {
    this.formProductData = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      slug: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
      image1: new FormControl(File, Validators.required),
      image2: new FormControl(File),
      status: new FormControl('', Validators.required),
      attachment: new FormControl([], Validators.required),
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
    // console.log(this.formProductData.value);
    // sending data to the page
    this.addProduct.emit(this.formProductData);
    this.isSubmitted = true;
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
    if (event.target.files) {
      this.formProductData.image1 = event.target.files[0];
    }
  }

  onImage2Change(event) {
    if (event.target.files) {
      this.formProductData.image2 = event.target.files[0];
    }
  }

  onAttachmentChange(event) {
    this.formProductData.attachment = [];
    if (event.target.files) {
      let files = event.target.files;
      this.formProductData.attachment = [...files];
    }
  }
}
