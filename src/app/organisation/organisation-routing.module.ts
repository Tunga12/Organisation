import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OrganisationComponent } from './organisation.component';

const routes: Routes = [
    {path: '', redirectTo: '/organisations', pathMatch: 'full' },
    {path: 'organisations', component: OrganisationComponent},
  {path: 'organisations/new', component: OrganisationFormComponent},
    {path: 'organisations/:id/edit', component: OrganisationFormComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganisationRoutingModule { }