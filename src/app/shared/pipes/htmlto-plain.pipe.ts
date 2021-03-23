import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'htmltoPlain'
})
export class HtmltoPlainPipe implements PipeTransform {
 

  
  transform(text):any{
    let getText= String(text).replace(/<[^>]+>/gm, '');
    let filterText =String(getText).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ') ;
    return filterText;
    
  }

}
