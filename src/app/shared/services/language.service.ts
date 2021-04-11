import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  current_lang: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public translate:TranslateService) {
    var currentLang = translate.currentLang;
    if (currentLang != null) {
        this.current_lang.next(currentLang)
    }
  }
}
