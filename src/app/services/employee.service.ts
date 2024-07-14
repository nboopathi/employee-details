import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface Employee {
  id?: number;
  name: string;
  role: string;
  dateOfJoining: Date;
  dateOfEnd: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends Dexie {

  employees: Dexie.Table<Employee, number>;

  constructor() {
    super('EmployeeDatabase');
    this.version(1).stores({
      employees: '++id,name,role,dateOfJoining,dateOfEnd'
    });
    this.employees = this.table('employees');
  }

  addEmployee(employee: Employee) {
    return this.employees.add(employee);
  }

  getEmployees() {
    return this.employees.toArray();
  }

  updateEmployee(id: number, employee: Partial<Employee>) {
    return this.employees.update(id, employee);
  }

  deleteEmployee(id: number) {
    return this.employees.delete(id);
  }
}
