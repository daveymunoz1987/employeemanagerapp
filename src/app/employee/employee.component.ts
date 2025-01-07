import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employee',
  imports: [ NgIf, FormsModule, NgFor, CommonModule ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;
  public isLoggedIn = false;
  public errorMessage: string = '';
  
  constructor(private employeeService: EmployeeService, public appComponent: AppComponent, private router: Router) {}
  
  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('mainContainer');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'update' && employee){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete' && employee){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public searchEmployees(key: string): void {
    const results: Employee [] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAvatar(index: number): string {
    const avatars = [
      'https://bootdey.com/img/Content/avatar/avatar1.png',
      'https://bootdey.com/img/Content/avatar/avatar2.png',
      'https://bootdey.com/img/Content/avatar/avatar3.png',
      'https://bootdey.com/img/Content/avatar/avatar4.png',
      'https://bootdey.com/img/Content/avatar/avatar5.png',
      'https://bootdey.com/img/Content/avatar/avatar6.png',
      'https://bootdey.com/img/Content/avatar/avatar7.png',
      'https://bootdey.com/img/Content/avatar/avatar8.png'
    ];
    return avatars[index % avatars.length];
  }

}
