import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

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
