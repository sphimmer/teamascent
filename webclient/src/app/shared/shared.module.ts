import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ButtonComponent } from './button/button.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { RouterModule } from '@angular/router';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalltoactionComponent } from './calltoaction/calltoaction.component';
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';
import { ChipComponent } from './chip/chip.component';
import { PersonComponent } from './person/person.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    TextareaComponent,
    TextInputComponent,
    ButtonComponent,
    DatepickerComponent,
    PasswordFieldComponent,
    HowitworksComponent,
    HeaderComponent,
    FooterComponent,
    CalltoactionComponent,
    LogoComponent,
    SearchComponent,
    SliderComponent,
    ChipComponent,
    PersonComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

  ],
  exports: [
    TextareaComponent,
    TextInputComponent,
    ButtonComponent,
    DatepickerComponent,
    PasswordFieldComponent,
    HowitworksComponent,
    HeaderComponent,
    FooterComponent,
    CalltoactionComponent,
    LogoComponent,
    SearchComponent,
    SliderComponent,
    ChipComponent,
    PersonComponent,
    ModalComponent,
  ]
})
export class SharedModule { }
