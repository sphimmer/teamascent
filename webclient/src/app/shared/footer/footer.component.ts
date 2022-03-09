import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/link.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public linkService: LinkService) { }

  ngOnInit(): void {
  }

}
