import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-breadcrumbs',
  templateUrl: './seller-breadcrumbs.component.html',
  styleUrls: ['./seller-breadcrumbs.component.css']
})
export class SellerBreadcrumbsComponent implements OnInit {
  @Input() directoryString = '';
  @Input() searchLength?;
  

  constructor() { }

  ngOnInit(): void {
  }

}
