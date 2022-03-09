import { Component, OnInit } from '@angular/core';
declare function passwordComponent():void;
@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    passwordComponent()
  }

}
