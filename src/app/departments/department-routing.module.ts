import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { DepartmentsComponent } from './departments.component';

const routes: Routes = [
    {path: 'departments', component: DepartmentsComponent},
    {path: 'departments/new', component: DepartmentFormComponent},
    {path: 'departments/tree', component: DepartmentTreeComponent},
    {path: 'departments/:id', component: DepartmentDetailComponent},
      {path: 'departments/:id/edit', component: DepartmentFormComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentRoutingModule { }