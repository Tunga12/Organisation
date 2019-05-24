import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organisation } from '../shared/organisation.model';
import { OrganisationService } from '../shared/organisation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/departments/shared/department.model';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { DepartmentFormComponent } from 'src/app/departments/department-form/department-form.component';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css']
})
export class OrganisationFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  id: number = 0;
  editMode: boolean;
  org: Organisation;


  constructor(
    private depService: DepartmentService,
    private orgService: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log("editMode: " + this.editMode);
        if (this.editMode) {
          this.org = this.orgService.getOrganisation(this.id);
          this.initForm();

        }
      }
    );
  }

  initForm(): any {

    setTimeout(() => {
      this.form.setValue({
        name: this.org.Name,
        description: this.org.Description,
        rootName: this.org.root.Name,
        rootDescription: this.org.root.Description
      })
    }, 200)

  }

  onSubmit() {
    console.log("Submitted.");


    if (!this.editMode) {
      let root: Department = new Department(
        this.depService.getNextId(),
        this.form.value.rootName,
        this.form.value.rootDescription,
        null
      )

      let org: Organisation = new Organisation(
        this.orgService.getNextId(),
        this.form.value.name,
        this.form.value.description,
        root,
      );

      console.log("organisation: ", JSON.stringify(org))

      var res = this.depService.postDepartment(root);

      console.log("post response" + JSON.stringify(res));
      org.root = res as Department;
      this.orgService.postOrganisation(org);
      this.toastr.success("Organisation Added", "Organisation Register");


    } else {

      let root: Department = new Department(
        this.org.root.DId,
        this.form.value.rootName,
        this.form.value.rootDescription,
        null
      )

      let org: Organisation = new Organisation(
        this.id,
        this.form.value.name,
        this.form.value.description,
        root,
      );


      this.orgService.putOrganisation(org);
      this.toastr.info("Organisation Edited", "Organisation Register");


    }

    this.orgService.refreshList();
    this.router.navigate(["/organisations"]);
  }


}
