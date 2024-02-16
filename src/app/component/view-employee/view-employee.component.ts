import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/register.modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.sass',
})
export class ViewEmployeeComponent implements OnInit {
  employeeId!: number;
  employeeDetails!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.employeeId = val['id'];
      this.getEmployeeDetails(this.employeeId);
    });
  }

  getEmployeeDetails(employeeId: number) {
    this.employeeService.getEmployeeId(employeeId).subscribe({
      next: (res) => {
        this.employeeDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
