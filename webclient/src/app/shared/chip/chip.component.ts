import { Component, Input, OnInit } from '@angular/core';

type IconType = "edit" | "exit";

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input()
  label?: string
  @Input()
  icon: IconType = "edit"
  constructor() {
   }

  ngOnInit(): void {
  }

}
