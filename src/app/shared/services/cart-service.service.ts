import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  existingCartLength: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    var existingCart = JSON.parse(localStorage.getItem('cart'));
    
    if (existingCart != null) {
      this.existingCartLength.next(existingCart.products.length);
    }
    
  }
}
