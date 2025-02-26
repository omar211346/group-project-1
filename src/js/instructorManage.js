export class InstructorManage {
    static getInstructors() {
        return JSON.parse(localStorage.getItem("instructors")) || [];
    }

    static saveInstructors(instructors) {
        localStorage.setItem("instructors", JSON.stringify(instructors));
    }

    static addInstructor(instructor) {
        const instructors = this.getInstructors();
        instructors.push(instructor);
        this.saveInstructors(instructors);
    }

    static deleteInstructor(id) {
        let instructors = this.getInstructors();
        instructors = instructors.filter(instructor => instructor.id !== id);
        this.saveInstructors(instructors);
    }

    static updateInstructor(id, newName, newEmail) {
        let instructors = this.getInstructors();
        instructors.forEach(instructor => {
            if (instructor.id === id) {
                instructor.name = newName;
                instructor.email = newEmail;
            }
        });
        this.saveInstructors(instructors);
    }
}