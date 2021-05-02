import {
  Component,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-for',
  templateUrl: './search-for.component.html',
  styleUrls: ['./search-for.component.css'],
})
export class SearchForComponent implements OnInit {
  // @ViewChildren('searchInputDiv')
  // searchInputDiv: QueryList<ElementRef>;
  products: any = [];
  show_suggestion: boolean;
  searchInput: string = '';
  keyword = 'name';
  isLoading: boolean;

  constructor(
    private router: Router,
    private searchService: SearchService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
  }

  onSelectItem(val){
    this.searchInput = val.slug;
    this.search()
  }

  search() {
    console.log(this.searchInput)
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchInput },
    });
  }

  update_suggestions(val?) {
    this.isLoading = true;
    this.searchInput = val;
    console.log(val);
    if (val !== undefined) {
      this.searchService.search(val).subscribe((result) => {
        this.products = result.data.results;
        this.isLoading = false;
      });
    } else if (val == undefined) {
      val = '';
      this.searchService.search(val).subscribe((result) => {
        this.products = result.data.results;
        this.isLoading = false;
      });
    }else {
      this.products = [];
    }
  }
}
