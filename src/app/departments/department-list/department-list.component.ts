import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { Department } from 'src/app/departments/shared/department.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  @Input() root: Department;

  departments: Department[];
 
  constructor(private service: DepartmentService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  onRowClicked(department: Department){
    this.router.navigate(['/departments', department.DId]);
  }

  onEdit(department: Department){
    this.router.navigate(['/departments', department.DId, 'edit']);
  }

  onDelete(department: Department){

    if (confirm('Are you sure to delete this record ?')){

    this.service.getDepartment(department.DId).subscribe(
      res => {
        res.Children = this.service.addChildren(res);
        this.service.children = [];

        if(res.Children){
          res.Children.forEach(element => {
            this.service.deleteDepartment(element.DId).subscribe(
              res => {
                console.log(res);
                this.service.refreshList();
                this.toastr.warning(element.Name + 'Deleted successfully', 'Department Register');
              }
            )
          });
        }
       
      },
      error => {
        this.toastr.error(error.message, 'Department Register');
      }
    )

    this.service.deleteDepartment(department.DId).subscribe(
      res => {
        console.log(res);
        this.service.refreshList();
        this.toastr.warning(department.Name + ' deleted successfully', 'Department Register');
      }
    )

    }
 

  }
  onNew(){
    this.router.navigate(['/departments/new']);
  }

  onTree(){
    this.router.navigate(['/departments/tree']);
  }


}
