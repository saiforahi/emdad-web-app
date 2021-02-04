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
  }

  search(query) {
    this.router.navigate(['/search'], {
      queryParams: { query: query },
    });
  }
}
