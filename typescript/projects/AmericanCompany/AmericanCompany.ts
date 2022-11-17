interface IEmployee {
    currentProject: string;
    name: string;
}

class Frontend implements IEmployee {
    private _currentProject: string;
    private _name: string;

    public constructor(currentProject: string, name: string) {
        this._currentProject = currentProject;
        this._name = name;
    }

    public set currentProject(currentProject: string) {
        this._currentProject = currentProject;
    }

    public get currentProject(): string {
        return this._currentProject;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
}

class Backend implements IEmployee {
    private _currentProject: string;
    private _name: string;

    public constructor(currentProject: string, name: string) {
        this._currentProject = currentProject;
        this._name = name;
    }

    public set currentProject(currentProject: string) {
        this._currentProject = currentProject;
    }

    public get currentProject(): string {
        return this._currentProject;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
}

class Company {
    private _employees: Array<IEmployee>;

    public constructor(employees: Array<IEmployee>) {
        this._employees = employees;
    }

    public set employees(employees: Array<IEmployee>) {
        this._employees = employees;
    }

    public get employees(): Array<IEmployee> {
        return this._employees;
    }

    public addEmployee(employee: IEmployee): void {
        this._employees.push(employee);
    }

    public getProjectList(): Array<string> {
        return new Array(...new Set(this._employees.map(employee => employee.currentProject)));
    }

    public getNameList(): Array<string> {
        return this._employees.map(employee => employee.name);
    }
}

let employees = new Array<IEmployee>(
    new Frontend("project_1", "A"),
    new Frontend("project_1", "B"),
    new Backend("project_1", "C"),
    new Frontend("project_2", "D"),
    new Backend("project_2", "E"),
    new Backend("project_3", "F")
);

let company = new Company(employees);

console.log(company.getProjectList());
console.log(company.getNameList());
company.addEmployee(new Backend("project_4", "G"));
console.log(company.getProjectList());
console.log(company.getNameList());
