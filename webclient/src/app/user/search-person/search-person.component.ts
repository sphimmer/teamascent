import { Component, OnInit } from '@angular/core';
import { IPerson } from 'src/interfaces/IUser';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
  styleUrls: ['./search-person.component.scss']
})
export class SearchPersonComponent implements OnInit {

  people: IPerson[] = []

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getPeople()
  }

  getPeople(){
    this.peopleService.getPeople().valueChanges.subscribe({
      next: (result) => {
        this.people = result.data.users
      }
    })
  }

}
