import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  @Output() login = new EventEmitter<{ userName: string, password: string}>();
  @Input() errorMessage: string = '';

  userName: string = '';
  password: string = '';

  onSubmit() {
    if (this.userName && this.password) {
      this.login.emit({ userName: this.userName, password: this.password});
    } else{
      this.errorMessage = 'Please fill in user name and password fields';
    }
  }
}
