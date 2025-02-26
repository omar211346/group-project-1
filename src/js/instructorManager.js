

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
        /* return instructor; */
    }

    static deleteInstructor(id) {
        let instructors = this.getInstructors();
        instructors = instructors.filter(instructor => instructor.id !== id);
        this.saveInstructors(instructors);
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
}