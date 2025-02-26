import { v4 as uuidv4 } from "uuid";

export class Student {
    constructor(name, email, id) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.courses = []; 
    }
}
