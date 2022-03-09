import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

declare function profileSubnav(): void
@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {
  @Input()
  currentPage?: string
  constructor(private location: Location) { }

  ngOnInit(): void {
    profileSubnav()
    this.currentPage = this.location.path()
  }

}
