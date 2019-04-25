import { NgModule } from '@angular/core';
import { OrganisationComponent } from './organisation.component';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationRoutingModule } from './organisation-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),   
        NgZorroAntdModule,
        OrganisationRoutingModule
    ],
    exports: [],
    declarations: [
        OrganisationComponent,
        OrganisationFormComponent,
        OrganisationListComponent
    ],
    providers: [],
})
export class OrganisationModule { }
