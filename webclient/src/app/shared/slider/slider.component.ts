import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input()
  value: string = "1"

  @Output()
  slideValue = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  change(num:string){
    this.value = num
    this.slideValue.emit(num)
  }

}
