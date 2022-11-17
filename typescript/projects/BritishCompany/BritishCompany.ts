class Employee {
    private _currentProject: string;
    private _name: string;

    public static readonly nameOfCurrentProject = "_currentProject";
    public static readonly nameOfName = "_name";

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

interface ILocation {
    set employees(employees: Array<Employee>);
    get employees(): Array<Employee>;
    addPerson(employee: Employee): void;
    getPerson(index: number): Employee;
    getCount(): number;
}

class CompanyLocationArray implements ILocation {
    private _employees: Array<Employee>;

    public constructor(employees: Array<Employee>) {
        this._employees = employees;
    }

    public set employees(employees: Array<Employee>) {
        this._employees = employees;
    }

    public get employees(): Array<Employee> {
        return this._employees;
    }

    public addPerson(employee: Employee): void {
        this._employees.push(employee);
    }

    public getPerson(index: number): Employee {
        return this._employees[index];
    }

    public getCount(): number {
        return this._employees.length;
    }
}

class CompanyLocationLocalStorage implements ILocation {
    private readonly _employees: string = "employees";

    public constructor(employees: Array<Employee>) {
        this.employees = employees;
    }

    public set employees(employees: Array<Employee>) {
        localStorage.setItem(this._employees, JSON.stringify(employees));
    }

    public get employees(): Array<Employee> {
        return Array.from(JSON.parse(localStorage.getItem(this._employees)!)).map((employee: any) => {
            return new Employee(employee[Employee.nameOfCurrentProject], employee[Employee.nameOfName]);
        });
    }

    public addPerson(employee: Employee): void {
        let employees = this.employees;
        employees.push(employee);
        this.employees = employees;
    }

    public getPerson(index: number): Employee {
        return this.employees[index];
    }

    public getCount(): number {
        return this.employees.length;
    }
}

class Company<L extends ILocation> {
    private _location: L;

    public constructor(location: L) {
        this._location = location;
    }

    public set location(location: L) {
        this._location = location;
    }

    public get location(): L {
        return this._location;
    }

    public getProjectList(): Array<string> {
        return new Array(...new Set(this._location.employees.map(employee => employee.currentProject)));
    }

    public getNameList(): Array<string> {
        return this._location.employees.map(employee => employee.name);
    }
}

let employees = new Array(
    new Employee("project_1", "A"),
    new Employee("project_1", "B"),
    new Employee("project_1", "C"),
    new Employee("project_2", "D"),
    new Employee("project_2", "E"),
    new Employee("project_3", "F")
);

function test (company: Company<ILocation>) {
    console.log("Start test");

    console.log(company.location.employees);
    console.log(company.getProjectList());
    console.log(company.getNameList());

    console.log("Adding employee");

    company.location.addPerson(new Employee("project_4", "G"));
    console.log(company.location.getPerson(6));
    console.log(company.location.getCount());

    console.log("Checking the added employee");

    console.log(company.location.employees);
    console.log(company.getProjectList());
    console.log(company.getNameList());

    console.log("End test");
}

let location_1 = new CompanyLocationArray(employees);
let company_1 = new Company<CompanyLocationArray>(location_1);

let location_2 = new CompanyLocationLocalStorage(employees);
let company_2 = new Company<CompanyLocationLocalStorage>(location_2);

test(company_1);
test(company_2);
