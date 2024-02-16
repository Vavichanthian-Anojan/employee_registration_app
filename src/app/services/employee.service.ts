import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/register.modal';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(data: Employee) {
    return this.http.post('http://localhost:3000/registered', data);
  }

  getEmployee() {
    return this.http.get<Employee>('http://localhost:3000/registered');
  }

  updateEmployee(data: Employee, id: number) {
    return this.http.put<Employee>(
      `http://localhost:3000/registered/${id}`,

      data
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employee>(`http://localhost:3000/registered/${id}`);
  }

  getEmployeeId(id: number) {
    return this.http.get<Employee>(`http://localhost:3000/registered/${id}`);
  }
}
