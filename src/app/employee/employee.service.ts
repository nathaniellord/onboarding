import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


const testEmployees = [
  { id: 1, firstname: 'Test', lastname: 'Employee', title: 'Mr', phone: '(123) 456-7890', address: '123 Some Street', shirtsize: 'M', hatsize: 'Large', ssn: '123-456-7890', dob: new Date() }
];

@Injectable()
export class EmployeeService {

  private employees = testEmployees;

  constructor() { }

  public getEmployees(): Observable<Object[]> {
    return Observable.of(this.employees);
  }

  public getEmployee(id): Observable<Object> {
    const employee = this.employees.filter(employee => employee.id === id);
    return employee.length ? Observable.of(employee[0]) : Observable.of(this.generateBlankEmployee());
  }

  private generateBlankEmployee() {
    return {
      title: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: '',
      shirtsize: '',
      hatsize: '',
      ssn: '',
      dob: undefined
    };
  }

  public saveEmployee(employee): Observable<Object[]> {
    if (employee.id) {
      // Update existing
      this.employees.forEach(currentEmployee => {
        if (currentEmployee.id === employee.id) {
          currentEmployee = employee;
        }
      });
    } else {
      // Create new employee
      // Because it's all stored in memory we're going to use a generator to create the ID rather than passing it to the server to generate the ID
      employee.id = generateId.next().value;
      this.employees.push(employee);
    }
    return Observable.of(employee);
  }

}

function* IDGenerator() {
  let index = 2;
  while (true) {
    yield index++;
  }
}

const generateId = IDGenerator();
