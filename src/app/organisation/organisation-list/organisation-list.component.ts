import { Component, OnInit } from '@angular/core';
import { Organisation } from '../shared/organisation.model';
import { OrganisationService } from '../shared/organisation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/departments/shared/department.service';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css']
})
export class OrganisationListComponent implements OnInit {

  organisations: Organisation[];
 
  constructor(
    private depService: DepartmentService,
    private orgService: OrganisationService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onRowClicked(org: Organisation){
    // this.router.navigate(['/organisations', org.OId]);
    // pass the org to the departments
    this.depService.root = org.root;
    this.router.navigate(['/departments']);
  }

  onEdit(org: Organisation){
    this.router.navigate(['/organisations', org.OId, 'edit']);
  }

  onDelete(org: Organisation){

    if (confirm('Are you sure, you want to delete this record ?')){
        this.orgService.deleteOrganisation(org);
        this.toastr.warning("Organisation Deleted", "Organisation Register");
    
    }
  }


  onNew(){
    this.router.navigate(['/organisations/new']);
  }

}
