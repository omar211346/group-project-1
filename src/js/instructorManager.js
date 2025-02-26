

export class InstructorManager {
    static getInstructors() {
        return JSON.parse(localStorage.getItem("instructors")) || [];
    }

    static saveInstructors(instructors) {
        localStorage.setItem("instructors", JSON.stringify(instructors));
    }

    static addInstructor(instructor){
        const instructors = this.getInstructors();
        instructors.push(instructor);
        this.saveInstructors(instructors);
        
    }

    static deleteInstructor(instructorId) {
        let instructors = this.getInstructors();
        const updatedInstructors = instructors.filter(inst => inst.id !== instructorId);
    
        if (instructors.length === updatedInstructors.length) {
            return false; 
        }
    
        this.saveInstructors(updatedInstructors);  
        return true; 
    }

    static updateInstructor(id, newFirstName, newLastName, newEmail) {
        let instructors = this.getInstructors();
        
        instructors.forEach(instructor => {
            if (instructor.id === id) {
                instructor.firstName = newFirstName;
                instructor.lastName = newLastName;
                instructor.email = newEmail;
            }
        });

        this.saveInstructors(instructors);
    }

    // ASSIGN INSTRUCTOR TO COURSES
    static assignCourseToInstructor(instructorId, courseId) {
        let instructors = this.getInstructors();
        const instructor = instructors.find(inst => inst.id === instructorId);
    
        if (!instructor) {
            return "Instructor not found.";
        }
    
        if (!instructor.courses) {
            instructor.courses = [];
        }
    
        if (instructor.courses.includes(courseId)) {
            return "Instructor is already assigned to this course.";
        }
    
        if (instructor.courses.length >= 5) {
            return "Instructor can only be assigned to a maximum of 5 courses.";
        }
    
        instructor.courses.push(courseId);
        this.saveInstructors(instructors);
        return true; 
    }



}