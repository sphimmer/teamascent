import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input()
  value: string = "1"

  constructor() { }

  ngOnInit(): void {
  }

  change(num:string){
    this.value = num
  }

}
