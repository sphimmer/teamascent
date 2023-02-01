import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input()
  placeHolder: string = '';

  @Output()
  enterKey = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onEnterKey(value: string) {
    this.enterKey.emit(value);
  }

}
