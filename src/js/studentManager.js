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


    static removeStudentFromCourse(studentId, courseId) {
        const students = this.getStudents();
        const student = students.find(s => s.id === studentId);
    
        if (!student || !student.courses) return "Student not found or no courses registered.";
        
        student.courses = student.courses.filter(id => id !== courseId);
        
        this.saveStudents(students);
        return true;
    }
    static updateStudent(id, newName, newEmail) {

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
    


    static enrollStudentInCourse(studentId, courseId) {
        const students = this.getStudents();
        const student = students.find(s => s.id === studentId);
    
        if (!student) return "Student not found.";
    
        if (!student.courses) {
            student.courses = []; // Sørg for at 'courses' feltet eksisterer
        }
    
        if (student.courses.includes(courseId)) {
            return "Student is already enrolled in this course.";
        }
    
        if (student.courses.length >= 3) {
            return "Student can only enroll in a maximum of 3 courses.";
        }
    
        student.courses.push(courseId);
        this.saveStudents(students);
    
        return true; // Påmelding vellykket
    }
    
}

