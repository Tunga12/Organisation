import { Injectable } from '@angular/core';
import { Organisation } from './organisation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  id: number = 0;
  list : Organisation[] = [];
  
  readonly rootURL = 'http://localhost:61241/api';


  constructor(private http: HttpClient) { }

  postOrganisation(data: Organisation) {
    this.list.push(data);
    // return this.http.post(this.rootURL + '/Department', data);
  }
  putOrganisation(data: Organisation) {
    var foundIndex = this.list.findIndex(x => x.OId == data.OId);
    this.list[foundIndex] = data;
    // return this.http.put(this.rootURL + '/Department/'+ data.OId, data);
  }
  deleteOrganisation(data) {
    var index = this.list.indexOf(data);
    this.list.splice(index, 1);
    // return this.http.delete(this.rootURL + '/Department/'+ id);
  }

  getOrganisation(id){
    // return this.http.get<Organisation>(this.rootURL + '/Department/'+ id);
    var foundIndex = this.list.findIndex(x => x.OId == id);
    return this.list[foundIndex];
  }

  refreshList(){
    console.log(this.list);
    // return this.http.get(this.rootURL + '/Department')
    // .subscribe(
    //   res => {
    //     this.list = res as Organisation[]
    //     // this.departmentsChanged.next(this.list);
    //     console.log(res);
    // }
    //   );
  }


  getNextId(){
    return this.id++;
  }

  // getUniqueId(): string {
  //     var id = Math.random().toString(36).substr(2, 16);
  //     console.log(id);
  //     return id;
  // }
  
}
