import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { OrganisationComponent } from './organisation/organisation.component';
import { OrganisationFormComponent } from './organisation/organisation-form/organisation-form.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { DepartmentModule } from './departments/department.module';
import { OrganisationModule } from './organisation/organisation.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),   
    NgZorroAntdModule,
    OrganisationModule,
    DepartmentModule,
    AppRoutingModule,
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
