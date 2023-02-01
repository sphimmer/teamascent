import { Component, Input, OnInit } from '@angular/core';
import { SkillChipItem } from 'src/interfaces/SkillChipItem';
import { ISkill, ISkillsResult, IUserSkill } from 'src/interfaces/Skills';
import { UserService } from '../user.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  showAddSkillModal: boolean = false;
  showEditSkillModal: boolean = false;

  skillsResult: ISkillsResult = { skills: [] };
  skills: IUserSkill[] = [];
  currentSkill: ISkill = { id: 0, name: '' };
  currentUserSkill: IUserSkill = {userToSkillId: 0, competencyLevel: 0, skill: {id: 0, name: ''}};
  currentCompetency: number = 0;

  modalError: string = ''

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMySkills().valueChanges.subscribe({
      next: (r) => {
        if (r.data) {
          this.skills = r.data.me.skills;
        }
      },
    });
  }

  onSaveSkill() {
    console.log(this.currentSkill, this.currentCompetency);
    this.userService
      .addSkill(
        this.currentSkill.id,
        this.currentCompetency
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          // if (result.data) this.skills = [...this.skills, result.data.addSkill];
          this.refreshUserSkills();
          this.showAddSkillModal = false;
        },
        error: (err: Error) => {
          if(err.message.includes("duplicate key")){
            this.modalError = "You already have this skill. Try adding another one or editing it instead."
          }

        }
      });
  }

  onSlideValueChange(value: string) {
    this.currentCompetency = parseInt(value);
  }

  onEditSlideValueChange(value: string){
    this.currentUserSkill.competencyLevel = parseInt(value)
  }

  onAddIconPressed(value: SkillChipItem) {
    this.showAddSkillModal = true;
    this.currentSkill = { id: value.skillId, name: value.name };
    console.log(value);
  }

  onEditIconPressed(value: SkillChipItem) {
    this.showEditSkillModal = true;
    this.currentUserSkill = { userToSkillId: value.userToSkillId!, competencyLevel: value.level ,skill: {id: value.skillId, name: value.name }};
    console.log(this.currentUserSkill)
  }

  onEnterKey(value: string) {
    // console.log('Enter key was pressed, value:', value);
    this.searchSkills(value);
  }

  onCloseModal() {
    this.showAddSkillModal = false;
    this.showEditSkillModal = false;
    this.modalError = ''
  }

  onUpdateSkill() {
    console.log(this.currentUserSkill);
    this.userService.updateSkill(this.currentUserSkill.userToSkillId, this.currentUserSkill.competencyLevel).subscribe({
      next: (result) => {
        if(result.data) {
          this.showEditSkillModal = false;
          this.refreshUserSkills()
        }
      },
      error: (err) => {
        this.modalError = err
      }
    })
  }

  onDeleteSkill() {
    this.userService.removeSkill(this.currentUserSkill.userToSkillId).subscribe({
      next: (result) => {
        if (result.data) {
          console.log(result.data.removeSkillFromUser);
          this.showEditSkillModal = false;
          this.refreshUserSkills();
        }
      },
    });

  }

  searchSkills(searchWord: string) {
    this.skillsResult = { skills: [] };
    console.log(searchWord);
    if (searchWord) {
      this.userService.searchSkills(searchWord).valueChanges.subscribe({
        next: (result) => {
          if (result) {
            this.skillsResult = result.data;
            console.log(this.skillsResult);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  refreshUserSkills() {
    this.userService.getMySkills(false).valueChanges.subscribe({
      next: (result) => {
        this.skills = result.data.me.skills;
      },
      error: (err) => {
        console.log('error getting my skills');
      },
    });
  }
}
