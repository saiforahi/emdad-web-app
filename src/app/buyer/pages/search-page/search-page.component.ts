import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  products: any;
  expandedSubCat: number;
  expandedCat: number;
  categories: any;
  prodInRow6: boolean;

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
      });
    });
    this.getCategories.category().subscribe((item) => {
      console.log(item);
      this.categories = item;
    });
    this.expandedCat = parseInt(localStorage.getItem('expandedCat'));
    this.expandedSubCat = parseInt(localStorage.getItem('expandedSubCat'));
  }

  getProdOnFilter(ChildCatId, subCatId, catId) {
    this.router.navigate(['/products/category/', ChildCatId]);
    localStorage.setItem('expandedSubCat', subCatId);
    localStorage.setItem('expandedCat', catId);
  }
}
