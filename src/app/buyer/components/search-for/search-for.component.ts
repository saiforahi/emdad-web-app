import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-for',
  templateUrl: './search-for.component.html',
  styleUrls: ['./search-for.component.css'],
})
export class SearchForComponent implements OnInit {
  products:any;
  show_suggestion:boolean;
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
  focusOutFunction(){
    if(document.getElementById('cat_menu')){
      document.getElementById('cat_menu').style.zIndex=""
    }
    this.show_suggestion=false;
  }
  update_suggestions(query:string){
    if(query.length>0){
      this.searchService.search(query).subscribe(result=>{
        this.products=result.data.results
        this.show_suggestion=true;
        if(document.getElementById('cat_menu')){
          document.getElementById('cat_menu').style.zIndex="-1"
        }
      })
    }
    else{
      this.products=[]
    }
  }

  get_matched_part(name:string,query:string){
    return name.slice(0,query.length)
  }
  get_suggested_part(name:string,query:string){
    return name.slice(query.length,name.length)
  }
}
