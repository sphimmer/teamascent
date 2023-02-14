import { Component, Input } from '@angular/core';
import { IPerson } from 'src/interfaces/IUser';

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})

export class PeopleTableComponent {

  @Input()
  people: IPerson[] = []

  columns: String[] = []

  getColumnNames(){
    this.columns = Object.keys(this.people[0]);
  }


}
