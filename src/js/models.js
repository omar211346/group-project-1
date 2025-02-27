import { v4 as uuidv4 } from "uuid";

export class Student {
    constructor(firstName, lastName, email) {
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.courses = []; 
    }
}

export class Instructor {
    constructor(firstName, lastName, email) {
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.courses = [];
    }
}  

export class Course {
    constructor(name, code) {
        this.id = uuidv4();
        this.name = name;
        this.code = code;
    }
}
