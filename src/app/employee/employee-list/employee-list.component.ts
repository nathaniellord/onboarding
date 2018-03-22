import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees;
  displayedColumns = ['title', 'firstname', 'lastname', 'phone', 'address', 'shirtsize', 'hatsize', 'ssn', 'dob'];

  constructor(public employeeService: EmployeeService) {
    this.employees = this.employeeService.getEmployees();
  }

  ngOnInit() {

  }

}
