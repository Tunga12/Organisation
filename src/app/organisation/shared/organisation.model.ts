import { Department } from 'src/app/departments/shared/department.model';

export class Organisation{
    
    OId: number;
    Name: string;
    Description: string;
    root: Department;

    constructor(OId: number,
        Name: string,
        Description: string,
        root: Department){

            this.OId= OId;
            this.Name = Name;
            this.Description = Description;
            this.root = root;
        }

}