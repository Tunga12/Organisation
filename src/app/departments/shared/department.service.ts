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

  departmentsChanged = new Subject<Department[]>();

  list: Department[] = [];
  constructor(private http: HttpClient) { }

  postDepartment(data: Department) {
    // return this.http.post(this.rootURL + '/Department', data);
    this.list.push(data);
    this.departmentsChanged.next(this.list.slice());
    return data;

  }
  putDepartment(data: Department) {
    // return this.http.put(this.rootURL + '/Department/'+ data.DId, data);
    console.log("data.DId: "+ data.DId);
    var foundIndex = this.list.findIndex(x => x.DId == data.DId);
    this.list[foundIndex] = data;
    this.departmentsChanged.next(this.list.slice());
  }
  deleteDepartment(data) {
    // return this.http.delete(this.rootURL + '/Department/'+ id);
    var index = this.list.indexOf(data);
    this.list.splice(index, 1);
    this.departmentsChanged.next(this.list.slice());
  }

  getDepartment(id) {
    // return this.http.get<Department>(this.rootURL + '/Department/'+ id);
    // this.list.forEach(dep => {
    //   console.log(dep.DId + "==" + id)
    //   if (dep.DId == id) {
    //     return dep;
    //   }
      
    // })
    // return null;
    var foundIndex = this.list.findIndex(x => x.DId == id);
    return this.list[foundIndex];


  }

  // get all children including grandchildren
  addChildren(res: Department) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].ParentDepartmentID == res.DId) {
        this.children.push(this.list[i]);
        this.addChildren(this.list[i]);
      }
    }

    return this.children;
  }

  addChildrenForTree(res: Department) {

    res.Children = [];

    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].ParentDepartmentID == res.DId) {
        res.Children.push(this.list[i]);
      }
    }

    return res;
  }


  refreshList() {

    console.log(this.list)
    // console.log("root: " + JSON.stringify(this.root))
    this.filteredlist = [];
    if (this.root) {
      // this.list = this.departmentsOfRoot(this.root, this.list);
      return this.departmentsOfRoot(this.root, this.list);  
    }

    

  }


  departmentsOfRoot(root: Department, list: Department[]) {

    // console.log("root" + JSON.stringify(root));

    this.filteredlist.push(root);
    //all departments that have root as a parent
    list.forEach(dep => {
      if (dep.ParentDepartmentID == root.DId) {
        this.departmentsOfRoot(dep, this.list)
      }
    })

    // var newList = this.filteredlist;
    // this.filteredlist = [];
    return this.filteredlist;

  }



  getNextId(){
    return this.id++;
  }

  // getUniqueId(): string {
  //   var id = Math.random().toString(36).substr(2, 16);
  //   console.log(id);
  //   return id;
  // }

}
