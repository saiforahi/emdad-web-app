import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  @ViewChild("menu", {static: true}) menu: MatMenuModule;
  @Input() items: {name: string, children: string[]}[];

  constructor() { }

  ngOnInit(): void {
  }

}
