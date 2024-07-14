import { Component, OnInit  } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, DatePipe  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  currentEmployees = true;
  previousEmployee = true;
  current: Employee[] =  [];
  previous: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
    
  }

  loadEmployees() {
    this.employeeService.getEmployees().then(employees => {
      this.employees = employees;
      
      console.log(this.employees);
      this.current = this.employees.filter(value => !value.dateOfEnd);
      this.previous = this.employees.filter(value => value.dateOfEnd);
      this.current.length > 0 ?  this.currentEmployees = true : this.currentEmployees = false;
      this.previous.length > 0 ?  this.previousEmployee = true : this.previousEmployee = false;
      console.log(this.current, this.previous)

    });
    
  
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).then(() => {
      this.loadEmployees();
    });
  }
}
