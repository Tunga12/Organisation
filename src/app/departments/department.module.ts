import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DepartmentsComponent } from './departments.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  declarations: [ 
    DepartmentsComponent,
    DepartmentDetailComponent,
    DepartmentFormComponent,
    DepartmentListComponent,
    DepartmentTreeComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgZorroAntdModule,
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
