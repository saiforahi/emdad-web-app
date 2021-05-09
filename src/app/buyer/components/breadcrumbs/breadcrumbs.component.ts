import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output,EventEmitter,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() directoryString = '';
  @Input() searchLength?: any;
  @Input() style='';
  @Output() view_style=new EventEmitter<string> ()
  @Output() clear_selections=new EventEmitter<string> ()
  line_parts:Array<string>=[];
  sellerWiseProduct = false

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    //this.view_style.emit('grid')
    if (this.router.url.split('/')[2] == "seller") {
      this.sellerWiseProduct = true;
    }
    //setting default style
    console.log('breadcrumb style',this.style)
    document.getElementById('grid_btn').style.backgroundColor="#1F4F9E"
    document.getElementById('grid_btn').style.color="#FFFFFF"
    document.getElementById('list_btn').style.backgroundColor="#fff"
    document.getElementById('list_btn').style.color="#000000"
    if(this.style==='NA'){
      document.getElementById('grid_btn').style.display="none"
      document.getElementById('list_btn').style.display="none"
    }
    this.slicer()
    this.view_style.emit('grid')
  }
  // ngOnChanges(changes: SimpleChanges):void { //catching change of style
  //   console.log(changes.style.currentValue)  
  //   if(changes.style.currentValue==='grid'){
  //     document.getElementById('grid_btn').style.backgroundColor="#1F4F9E"
  //     document.getElementById('grid_btn').style.color="#FFFFFF"
  //     document.getElementById('list_btn').style.backgroundColor="#fff"
  //     document.getElementById('list_btn').style.color="#000000"
  //     this.view_style.emit('grid')
  //   }
  //   else if(changes.style.currentValue==='list'){
  //     document.getElementById('list_btn').style.backgroundColor="#1F4F9E"
  //     document.getElementById('list_btn').style.color="#FFFFFF"
  //     document.getElementById('grid_btn').style.backgroundColor="#fff"
  //     document.getElementById('grid_btn').style.color="#000000"
  //     this.view_style.emit('list')
  //   }  
  // }
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

  clear_selects(){
    this.clear_selections.emit("clear_selections")
  }

  slicer(){
    this.line_parts=this.directoryString.split('/')
    console.log('line parts',this.line_parts)
  }
}
