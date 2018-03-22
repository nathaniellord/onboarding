import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../employee.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  titles = ['Mr', 'Mrs', 'Dr'];
  shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  hatSizes = ['Small', 'Medium', 'Large', 'XL', 'XXL'];
  employee;
  id;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = +params.get('id');
        return this.service.getEmployee(this.id);
      }).subscribe(employee => {
        console.log(employee);
        this.employee = employee;
      });
  }

  validateForm() {
    return true;
  }

  save() {
    if (this.validateForm()) {
      this.service.saveEmployee(this.employee).subscribe(result => {
        this.router.navigate(['/employees']);
      });
    } else {
      alert('Validation Errors. Please check the form');
    }
  }

}
