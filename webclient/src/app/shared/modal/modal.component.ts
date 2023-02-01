import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  title: string = ''

  @Input()
  buttonLabel: string = ''

  @Input()
  secondaryButtonLabel?: string

  @Input()
  modalError?: string;

  @Output()
  actionButton = new EventEmitter<string>();

  @Output()
  closeButton = new EventEmitter<string>();

  @Output()
  secondaryActionButton = new EventEmitter<string>();

  onCloseButton(){
    console.log('close modal');
    this.closeButton.emit('close');
  }

  onActionButton(){
    console.log('action button');
    this.actionButton.emit('do your thing');
  }

  onSecondaryActionButton(){
    this.secondaryActionButton.emit();
  }
}
