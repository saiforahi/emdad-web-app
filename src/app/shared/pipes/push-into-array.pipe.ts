import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pushIntoArray'
})
export class PushIntoArrayPipe implements PipeTransform {

  transform(text):any{
    let getText= String(text).replace(/<[^>]+>/gm, '');
    let filterText =String(getText).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ') ;
    let arrayForm:any=[];
    arrayForm.push(filterText.split('\n'));
    console.log('value',arrayForm);
    return arrayForm;
   
    
  }

}
