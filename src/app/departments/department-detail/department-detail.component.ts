import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/departments/shared/department.model';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {

  department: Department;
  id: number;

  constructor(private service: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        var res = this.service.getDepartment(this.id)
        // .subscribe(
        //   res => {

            res.Children = [];
            for( var i = 0; i < this.service.list.length; i++ ){
              if(this.service.list[i].ParentDepartmentID == res.DId){
                res.Children.push(this.service.list[i]);
                
              }
            }

            this.department = res;
            console.log(this.department);

        //   }
        // );
        

      }
    );

  }

  onBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }





}
