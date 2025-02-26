

export class Course {
    constructor(name, code){
        this.name = name; 
        this.code = code; 
        this.students = []; 
        this.instructor = null; 
    }
}