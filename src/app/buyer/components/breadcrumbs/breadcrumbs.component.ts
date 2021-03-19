import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output,EventEmitter,OnChanges } from '@angular/core';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() directoryString = '';
  @Input() searchLength?;
  @Input() style='';
  @Output() view_style=new EventEmitter<string> ()
  constructor() { }

  ngOnInit(): void {
    //this.view_style.emit('grid')
    console.log('breadcrumb style',this.style)
    document.getElementById('grid_btn').style.backgroundColor="#1F4F9E"
    document.getElementById('grid_btn').style.color="#FFFFFF"
    document.getElementById('list_btn').style.backgroundColor="#fff"
    document.getElementById('list_btn').style.color="#000000"
    //this.emit_style_change(this.style)
  }
  ngOnChanges(changes: SimpleChanges):void {
    console.log(changes.style.currentValue)  
    if(changes.style.currentValue==='grid'){
      document.getElementById('grid_btn').style.backgroundColor="#1F4F9E"
      document.getElementById('grid_btn').style.color="#FFFFFF"
      document.getElementById('list_btn').style.backgroundColor="#fff"
      document.getElementById('list_btn').style.color="#000000"
    }
    else if(changes.style.currentValue==='list'){
      document.getElementById('list_btn').style.backgroundColor="#1F4F9E"
      document.getElementById('list_btn').style.color="#FFFFFF"
      document.getElementById('grid_btn').style.backgroundColor="#fff"
      document.getElementById('grid_btn').style.color="#000000"
    }
    
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
}
