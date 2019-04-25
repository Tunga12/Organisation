import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { DepartmentService } from 'src/app/departments/shared/department.service';
import { Department } from 'src/app/departments/shared/department.model';
import { fillProperties } from '@angular/core/src/util/property';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.css']
})
export class DepartmentTreeComponent implements OnInit {

  // nodes = [
  //   { title: 'Expand to load', key: '0' },
  //   { title: 'Expand to load', key: '1' },
  //   { title: 'Tree Node', key: '2', isLeaf: true }
  // ];

    nodes: NzTreeNodeOptions[] = [];
 

  constructor(private service: DepartmentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filter()
  }

  filter(){
    this.service.list.forEach(element => {
      if(element.ParentDepartmentID == null){
        this.nodes.push({ title: element.Name, key: <string><any>element.DId})
      }
    });
  }

  onBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  nzEvent(event: Required<NzFormatEmitEvent>): void {
    console.log(event);
    // load child async
    if (event.eventName === 'expand') {
      const node = event.node;
      if (node && node.getChildren().length === 0 && node.isExpanded) {
        this.loadNode(node.key).then(data => {
            node.addChildren(data);
        });
      }
    }
  }

  loadNode(key): Promise<NzTreeNodeOptions[]> {
    return new Promise(resolve => {
      this.service.getDepartment(+key).subscribe(
        res => {
          res = this.service.addChildrenForTree(res);
          var children = [];
          if(res.Children){
            res.Children.forEach(element => {
              children.push({ title: element.Name, key: <string><any>element.DId })
            });
          }

          resolve(children)
        }
      )
    });
  }

}
