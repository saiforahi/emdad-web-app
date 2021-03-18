import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-search-for',
  templateUrl: './search-for.component.html',
  styleUrls: ['./search-for.component.css'],
})
export class SearchForComponent implements OnInit {
  products:any = [];
  show_suggestion:boolean;
  searchInput:string = '';
  constructor(
    private router: Router,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.searchInput.length)
  }

  search() {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchInput },
    });
  }
  focusOutFunction(){
    if(document.getElementById('cat_menu')){
      document.getElementById('cat_menu').style.zIndex=""
    }
    this.show_suggestion=false;
  }
  setItem(prod_name:string){
    console.log(prod_name)
    this.searchInput=prod_name
  }
  update_suggestions(){
    if(this.searchInput!==undefined){
      this.searchService.search(this.searchInput).subscribe(result=>{
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
