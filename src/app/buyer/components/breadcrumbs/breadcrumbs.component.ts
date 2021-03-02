import { Component, Input, OnInit, Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() directoryString = '';
  @Input() searchLength?;
  @Output() view_style=new EventEmitter<string> ()
  constructor() { }

  ngOnInit(): void {
    this.view_style.subscribe(value=>{
      if(value==='list'){
        document.getElementById('list_btn').style.backgroundColor="#1F4F9E"
        document.getElementById('list_btn').style.color="#FFFFFF"
        document.getElementById('grid_btn').style.backgroundColor="#fff"
        document.getElementById('grid_btn').style.color="#000000"
      }
      else{
        document.getElementById('list_btn').style.backgroundColor="#1F4F9E"
        document.getElementById('list_btn').style.color="#FFFFFF"
        document.getElementById('grid_btn').style.backgroundColor="#fff"
        document.getElementById('grid_btn').style.color="#000000"
      }
    })
  }
  emit_style_change(value:string){
    this.view_style.emit(value)
    if(value==='grid'){
      document.getElementById('grid_btn').style.backgroundColor="#1F4F9E"
      document.getElementById('grid_btn').style.color="#FFFFFF"
      document.getElementById('list_btn').style.backgroundColor="#fff"
      document.getElementById('list_btn').style.color="#000000"
    }
    else if(value==='list'){
      document.getElementById('list_btn').style.backgroundColor="#1F4F9E"
      document.getElementById('list_btn').style.color="#FFFFFF"
      document.getElementById('grid_btn').style.backgroundColor="#fff"
      document.getElementById('grid_btn').style.color="#000000"
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes')
  }
}
