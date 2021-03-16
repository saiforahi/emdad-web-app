import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() { }
}
