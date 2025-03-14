export class StudentManager {
    static getStudents() {
        return JSON.parse(localStorage.getItem("students")) || [];
    }

    static saveStudents(students) {
        localStorage.setItem("students", JSON.stringify(students));
    }

    static addStudent(student) {
        const students = this.getStudents();
        students.push(student);
        this.saveStudents(students);
    }

    static deleteStudent(id) {
        let students = this.getStudents();
        const updatedStudents = students.filter(student => student.id !== id);
        
        if (students.length === updatedStudents.length) {
            return false;
        }
        
        this.saveStudents(updatedStudents);
        return true;
    }

    static updateStudent(id, firstName, lastName, email) {
        let students = this.getStudents();
        const student = students.find(student => student.id === id);
        
        if (!student) {
            return false;
        }
        
        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        
        this.saveStudents(students);
        return true;
    }
}
