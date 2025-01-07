import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { LoginComponent } from "./login/login.component";
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  imports: [NgIf, FormsModule, LoginComponent, EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Employee Manager App';
  public isLoggedIn = false;
  public userName: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public apiServerUrl = environment.apiUrl;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if(loggedIn === 'true'){
      this.isLoggedIn = true;
    }
  }

  public login(userName: string, password: string): void {

    const loginUrl = this.apiServerUrl + `/user/login/${userName}/${password}`;

    this.loginService.validateLogin(loginUrl).subscribe(
      (response) => {
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/app']);
        alert('Login successful');
      },
      (error) =>{
        this.errorMessage = 'Invalid username or password';
      }
    )
  }

  public logout() {
    this.isLoggedIn = false;
    this.errorMessage = '';
    this.router.navigate(['/login']);
    localStorage.removeItem('isLoggedIn');
    alert('Logout successful');
  }
}
