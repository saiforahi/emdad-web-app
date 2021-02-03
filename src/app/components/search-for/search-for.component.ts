import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-search-for',
  templateUrl: './search-for.component.html',
  styleUrls: ['./search-for.component.css'],
})
export class SearchForComponent implements OnInit {

  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.route.queryParams.subscribe((params) => {
    //   console.log(params.query);
    //   this.searchService.search(params.query).subscribe((item) => {
    //     console.log(item);
    //     this.searchService.searchProducts = item.data.results;
    //   });
    // });
  }

  search(query) {
    this.router.navigate(['/search'], {
      queryParams: { query: query },
    });
  }
}
