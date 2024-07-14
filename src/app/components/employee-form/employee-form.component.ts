import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],      
      dateOfJoining: ['', Validators.required],
      dateOfEnd: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = +params['id'];
        this.employeeService.employees.get(this.employeeId).then(employee => {
          if (employee) {
            this.employeeForm.patchValue(employee);
          }
        });
      }
    });
  }

  onSubmit() {
    const employee: Employee = this.employeeForm.value;
    console.log(employee)
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employee).then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.employeeService.addEmployee(employee).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
