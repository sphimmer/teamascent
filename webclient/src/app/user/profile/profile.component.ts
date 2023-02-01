import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().valueChanges.subscribe({
      next: (result) => {
        console.log(result.data.me)
        this.userService.me = result.data.me
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
