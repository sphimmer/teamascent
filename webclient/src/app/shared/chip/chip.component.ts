import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkillChipItem } from 'src/interfaces/SkillChipItem';

type IconType = 'edit' | 'exit' | 'add';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input()
  name: string = '';
  @Input()
  icon: IconType = 'exit';
  @Input()
  id: string = '';
  @Input()
  skillId: string = '';
  @Input()
  level: string = '';

  @Output()
  iconPress = new EventEmitter<SkillChipItem>();

  constructor() {}

  ngOnInit(): void {}

  onIconPress() {
    this.iconPress.emit({
      skillId: parseInt(this.skillId),
      name: this.name,
      level: parseInt(this.level),
      userToSkillId: parseInt(this.id),
    });
  }
}
