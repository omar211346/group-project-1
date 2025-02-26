import { v4 as uuidv4 } from "uuid";

export class Instructor {
    constructor(firstName, lastName, email){
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName; 
        this.email = email; 
        this.courses = []; 
    }
}