export class Department{
    DId: number;
    Name: string;
    Description: string;
    ParentDepartmentID: number;
    ParentDepartment?: Department
    Children?: Department[];

    constructor(DId: number, Name: string,
        Description: string,
        ParentDepartmentID: number,
        Children?: Department[]
        ){
            this.DId = DId;
            this.Name = Name;
            this.Description = Description;
            this.ParentDepartmentID = ParentDepartmentID;
            this.Children = Children;
    }

}