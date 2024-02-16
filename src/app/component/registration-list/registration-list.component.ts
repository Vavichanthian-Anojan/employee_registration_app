import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from '../../models/register.modal';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.sass',
})
export class RegistrationListComponent implements OnInit {
  public employee!: Employee[];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'gender',
    'joinDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmService: NgConfirmService,
    private toastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployee().subscribe({
      next: (res: Employee | Employee[]) => {
        if (Array.isArray(res)) {
          this.employee = res;
        } else {
          this.employee = [res];
        }
        this.dataSource = new MatTableDataSource(this.employee);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteEmployee(id: number) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        this.employeeService.deleteEmployee(id).subscribe({
          next: (res) => {
            this.toastService.success({
              detail: 'SUCCESS',
              summary: 'Deleted Successfully',
              duration: 3000,
            });
            this.getEmployee();
          },
          error: (err) => {
            this.toastService.error({
              detail: 'ERROR',
              summary: 'Something went wrong!',
              duration: 3000,
            });
          },
        });
      },
      () => {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
