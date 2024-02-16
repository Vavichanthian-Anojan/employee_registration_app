import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { RegistrationListComponent } from './component/registration-list/registration-list.component';
import { ViewEmployeeComponent } from './component/view-employee/view-employee.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: RegistrationComponent },
  { path: 'update/:id', component: RegistrationComponent },
  { path: 'list', component: RegistrationListComponent },
  { path: 'view/:id', component: ViewEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
