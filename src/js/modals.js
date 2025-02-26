import { v4 as uuidv4 } from "uuid";

export class Student {
    constructor(name, email, id) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.courses = []; 
    }
}

export class Instructor {
    constructor(name, email, id) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.courses = [];
    }
}   


export class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
