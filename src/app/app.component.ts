import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './departments/shared/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Organisation';

  constructor(private service:DepartmentService){}

  ngOnInit(): void {
    this.service.refreshList();
  }
}
