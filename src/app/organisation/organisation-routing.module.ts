import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OrganisationComponent } from './organisation.component';

const routes: Routes = [
  { path: '', redirectTo: '/organisations', pathMatch: 'full' },
  {
    path: 'organisations', component: OrganisationComponent, data: {
      breadcrumb: 'Organisation List'
    }
  },
  {
    path: 'organisations/new', component: OrganisationFormComponent, data: {
      breadcrumb: 'Add Organisation'
    }
  },
  {
    path: 'organisations/:id/edit', component: OrganisationFormComponent, data: {
      breadcrumb: 'Edit Organisation'
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationRoutingModule { }

