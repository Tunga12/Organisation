import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { Department } from 'src/app/departments/shared/department.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departments: Department[];
  subscription: Subscription;


  constructor(private service: DepartmentService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subscription = this.service.departmentsChanged.subscribe(
      list => {
        this.departments = this.service.refreshList();
        console.log(this.departments);
      }
    )

    this.departments = this.service.refreshList();
    // this.service.filteredlist = [];

  }

  onRowClicked(department: Department) {
    this.router.navigate(['/departments', department.DId]);
  }

  onEdit(department: Department) {
    this.router.navigate(['/departments', department.DId, 'edit']);
  }

  onDelete(department: Department) {

    if (confirm('Are you sure to delete this record ?')) {

      var res = this.service.getDepartment(department.DId);

      res.Children = this.service.addChildren(res);
      this.service.children = [];

      if (res.Children) {
        res.Children.forEach(element => {
          this.service.deleteDepartment(element.DId);

          // this.service.refreshList();
          // this.service.filteredlist = [];
          this.toastr.warning(element.Name + 'Deleted successfully', 'Department Register');

        });
      }

      if (department.ParentDepartmentID != null) {
        this.service.deleteDepartment(department.DId);
        // this.service.refreshList();

        this.toastr.warning(department.Name + ' deleted successfully', 'Department Register');

      } else {
        // this.service.refreshList();
        // this.service.filteredlist = [];
        this.toastr.warning("To delete the CEO, you must delete the organisation", 'Department Register')
      }


    }


  }
  onNew() {
    this.router.navigate(['/departments/new']);
  }

  onTree() {
    this.router.navigate(['/departments/tree']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
