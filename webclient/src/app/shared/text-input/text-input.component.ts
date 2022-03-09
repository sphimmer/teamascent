import { Component, ElementRef, Input, NgModule, OnInit } from '@angular/core';
declare function floatingLabels(): void;
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input()
  label?: string
  @Input()
  value?: string
  constructor(){}

  ngOnInit(): void {
    floatingLabels()
  }


}
