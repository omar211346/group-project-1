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
        students = students.filter(student => student.id !== id);
        this.saveStudents(students);
    }

    static updateStudent(id, newName, newEmail) {
        let students = this.getStudents();
        students.forEach(student => {
            if (student.id === id) {
                student.name = newName;
                student.email = newEmail;
            }
        });
        this.saveStudents(students);
    }
}
