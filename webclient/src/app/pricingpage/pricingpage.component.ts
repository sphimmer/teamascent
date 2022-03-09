import { Component, OnInit } from '@angular/core';

declare function priceTable(): void;
declare function customSelect(): void;


@Component({
  selector: 'app-pricingpage',
  templateUrl: './pricingpage.component.html',
  styleUrls: ['./pricingpage.component.scss']
})
export class PricingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    priceTable()
    customSelect()
  }

}
