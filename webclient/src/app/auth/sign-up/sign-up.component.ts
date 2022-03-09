import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/link.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public linkService: LinkService) { }

  ngOnInit(): void {
  }

}
