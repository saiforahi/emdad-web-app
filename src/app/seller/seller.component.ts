import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit, AfterViewInit {
  sideMenuCollapsed = false;
  loggedInUser = true;
  showNavigation: boolean = true;

  @ViewChild('sidenav') sidenav: any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.split('/')[2] == 'login' || this.router.url.split('/')[2] == 'signup') {
      this.showNavigation = false;
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f9f9f9';
  }

  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }
}
