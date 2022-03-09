import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input()
  firstName?: string

  @Input()
  lastName?: string
  constructor() { }

  ngOnInit(): void {
  }

}
