"use strict";
class Employee {
    constructor(currentProject, name) {
        this._currentProject = currentProject;
        this._name = name;
    }
    set currentProject(currentProject) {
        this._currentProject = currentProject;
    }
    get currentProject() {
        return this._currentProject;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
Employee.nameOfCurrentProject = "_currentProject";
Employee.nameOfName = "_name";
class CompanyLocationArray {
    constructor(employees) {
        this._employees = employees;
    }
    set employees(employees) {
        this._employees = employees;
    }
    get employees() {
        return this._employees;
    }
    addPerson(employee) {
        this._employees.push(employee);
    }
    getPerson(index) {
        return this._employees[index];
    }
    getCount() {
        return this._employees.length;
    }
}
class CompanyLocationLocalStorage {
    constructor(employees) {
        this._employees = "employees";
        this.employees = employees;
    }
    set employees(employees) {
        localStorage.setItem(this._employees, JSON.stringify(employees));
    }
    get employees() {
        return Array.from(JSON.parse(localStorage.getItem(this._employees))).map((employee) => {
            return new Employee(employee[Employee.nameOfCurrentProject], employee[Employee.nameOfName]);
        });
    }
    addPerson(employee) {
        let employees = this.employees;
        employees.push(employee);
        this.employees = employees;
    }
    getPerson(index) {
        return this.employees[index];
    }
    getCount() {
        return this.employees.length;
    }
}
class Company {
    constructor(location) {
        this._location = location;
    }
    set location(location) {
        this._location = location;
    }
    get location() {
        return this._location;
    }
    getProjectList() {
        return new Array(...new Set(this._location.employees.map(employee => employee.currentProject)));
    }
    getNameList() {
        return this._location.employees.map(employee => employee.name);
    }
}
let employees = new Array(new Employee("project_1", "A"), new Employee("project_1", "B"), new Employee("project_1", "C"), new Employee("project_2", "D"), new Employee("project_2", "E"), new Employee("project_3", "F"));
function test(company) {
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
let company_1 = new Company(location_1);
let location_2 = new CompanyLocationLocalStorage(employees);
let company_2 = new Company(location_2);
test(company_1);
test(company_2);
