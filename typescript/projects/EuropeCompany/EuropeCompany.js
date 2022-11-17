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
class Company {
    constructor(employees) {
        this._employees = employees;
    }
    set employees(employees) {
        this._employees = employees;
    }
    get employees() {
        return this._employees;
    }
    addEmployee(employee) {
        this._employees.push(employee);
    }
    getProjectList() {
        return new Array(...new Set(this._employees.map(employee => employee.currentProject)));
    }
    getNameList() {
        return this._employees.map(employee => employee.name);
    }
}
class Frontend extends Employee {
}
class Backend extends Employee {
}
let employees = new Array(new Frontend("project_1", "A"), new Frontend("project_1", "B"), new Backend("project_1", "C"), new Frontend("project_2", "D"), new Backend("project_2", "E"), new Backend("project_3", "F"));
let company = new Company(employees);
console.log(company.getProjectList());
console.log(company.getNameList());
company.addEmployee(new Backend("project_4", "G"));
console.log(company.getProjectList());
console.log(company.getNameList());
