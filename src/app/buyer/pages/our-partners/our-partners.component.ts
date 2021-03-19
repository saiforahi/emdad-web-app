import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.css']
})



export class OurPartnersComponent implements OnInit {
  currentElement: any;
  contents: Content[];
  constructor() {
    this.contents = [
      { name: 'oem comunicao', link: '../../../../assets/oem.png', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
      { name: 'sansui', link: '../../../../assets/sansui.png', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
      { name: '96points', link: '../../../../assets/96Points.png', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },

    ];
  }

  ngOnInit(): void {
    this.currentElement = this.contents[0];

  }
  prevCont() {
    this.currentElement = this.contents[0];
  }
  nextCont() {
    this.currentElement = this.contents[1];
  }
  /*   nextCustomer() {
      vm.index = vm.index + 1;
      if (vm.index === vm.customers.length) {
        vm.index = 0;
      }
      
      vm.customer = vm.customers[vm.index];
    }
   */
}
interface Content {

  name: string;
  link: string;
  text: string
}
