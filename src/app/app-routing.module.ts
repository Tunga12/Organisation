import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepartmentFormComponent } from './departments/department-form/department-form.component';
import { DepartmentDetailComponent } from './departments/department-detail/department-detail.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { Department } from './departments/shared/department.model';
import { DepartmentTreeComponent } from './departments/department-tree/department-tree.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { OrganisationFormComponent } from './organisation/organisation-form/organisation-form.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  // { path: "**", component: PageNotFoundComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  