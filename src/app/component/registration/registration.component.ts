import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/register.modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.sass',
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedGender!: string;
  genders: string[] = ['Male', 'Female'];
  isUpdateActive = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: NgToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      gender: [''],
      joinDate: [''],
    });

    this.activatedRoute.params.subscribe({
      next: (val) => {
        this.employeeId = val['id'];
        if (this.employeeId) {
          this.isUpdateActive = true;
          this.employeeService.getEmployeeId(this.employeeId).subscribe({
            next: (res) => {
              this.setFormValue(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }

  setFormValue(employee: Employee) {
    this.registrationForm.setValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobile: employee.mobile,
      gender: employee.gender,
      joinDate: employee.joinDate,
    });
  }

  submit() {
    this.employeeService.addEmployee(this.registrationForm.value).subscribe({
      next: (res) => {
        this.toastService.success({
          detail: 'SUCCESS',
          summary: 'Registration Successful',
          duration: 3000,
        });
        this.registrationForm.reset();
      },
    });
  }

  update() {
    this.employeeService
      .updateEmployee(this.registrationForm.value, this.employeeId)
      .subscribe({
        next: (res) => {
          this.toastService.success({
            detail: 'SUCCESS',
            summary: 'User Details Updated Successful',
            duration: 3000,
          });
          this.router.navigate(['list']);
          this.registrationForm.reset();
        },
      });
  }
}
