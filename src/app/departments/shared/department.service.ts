import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  id: number = 0;

  root: Department = null;
  filteredlist: Department[] = [];

  children: Department[] = [];

  // formData: Department;
  readonly rootURL = 'http://localhost:61241/api';

  // departmentsChanged = new Subject<Department[]>();

  list : Department[];
  constructor(private http: HttpClient) { }

  postDepartment(data: Department) {
    return this.http.post(this.rootURL + '/Department', data);
  }
  putDepartment(data: Department) {
    return this.http.put(this.rootURL + '/Department/'+ data.DId, data);
  }
  deleteDepartment(id) {
    return this.http.delete(this.rootURL + '/Department/'+ id);
  }

  getDepartment(id){
    return this.http.get<Department>(this.rootURL + '/Department/'+ id);
    // return this.list[id];
  }

  addChildren(res: Department){
    for( var i = 0; i < this.list.length; i++ ){
      if(this.list[i].ParentDepartmentID == res.DId){
        this.children.push(this.list[i]);
        this.addChildren(this.list[i]);
      }
    }

    return this.children;
  }

  addChildrenForTree(res: Department){

    res.Children = [];

    for( var i = 0; i < this.list.length; i++ ){
      if(this.list[i].ParentDepartmentID == res.DId){
        res.Children.push(this.list[i]);
      }
    }

    return res;
  }


  refreshList(){
    return this.http.get(this.rootURL + '/Department')
    .subscribe(
      res => {

        //all departments
        this.list = res as Department[];
        if(this.root){
          this.list = this.departmentsOfRoot(this.root, this.list);
          this.filteredlist = [];
        }
        // this.departmentsChanged.next(this.list);
        console.log(res);
    }
      );
  }

  
  departmentsOfRoot(root: Department, list: Department[]){

    // console.log("root" + JSON.stringify(root));

    this.filteredlist.push(root);
    //all departments that have root as a parent
    list.forEach(dep => {
      if(dep.ParentDepartmentID == root.DId){
        this.departmentsOfRoot(dep, this.list )
      }
    })

    return this.filteredlist;

  }



  getNextId(){
    return this.id++;
  }

}
