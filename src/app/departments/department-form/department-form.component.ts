import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from 'src/app/departments/shared/department.model';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  id: number = 0;
  editMode: boolean;
  department: Department;

  possibleParents: Department[] = this.service.list;
  
  constructor(private service: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log("editMode: " + this.editMode);
        
        if(this.editMode){
          this.service.getDepartment(this.id)
          .subscribe( 
          res => {
            this.department = res;
            console.log(this.department);
            this.initForm();
            // this.possibleParents = [];
            this.removeGrandChildren(this.department, this.possibleParents);

          }
        )
       
       
      }
    }
    );
  }

  
  removeGrandChildren(root: Department, list: Department[]){

    var index = this.possibleParents.indexOf(root);
    this.possibleParents.splice(index, 1);

    //all departments that don't have root as a parent
    list.forEach(dep => {
      if(dep.ParentDepartmentID == root.DId){
        this.removeGrandChildren(dep, this.service.list )
      }
    })

    return this.possibleParents;

  }


  initForm(): any {
    var parentName;
    if(this.department.ParentDepartment){
      parentName = this.department.ParentDepartment.Name;
    }else{
      parentName = null;
    }
    console.log("parentName: " + parentName);
   this.form.setValue({
      name: this.department.Name,
      description: this.department.Description,
      parent: [parentName]
   })

  }

  onSubmit(){
    console.log("Submitted.");
    console.log("parent: " + this.form.value.parent.DId);
    console.log(this.id);
    let department: Department = new Department(
      0,
      this.form.value.name, 
      this.form.value.description, 
      this.form.value.parent.DId, 
    );
    console.log("department: ", JSON.stringify(department))
    if(!this.editMode){
      this.service.postDepartment(department)
      .subscribe(
        res => {
          console.log(res);
          this.service.refreshList();
          this.toastr.success('Added successfully', 'Department Register');

        }, 
        error => {
          this.toastr.error(error, 'Department Register');
        }
      );
      
    }else{
      department.DId = this.id;
      this.service.putDepartment(department)
      .subscribe(
        res => {
          console.log(res);
          this.service.refreshList();
          this.toastr.info('Edited successfully', 'Department Register');

        },
        error => {
          this.toastr.error(error, 'Department Register');
        }
      )
    }
    
    this.service.refreshList();
    this.router.navigate(["/departments"]);
  }


}
