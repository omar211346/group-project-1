import { StudentManager } from "./studentManager.js";
import { InstructorManager } from "./instructorManager.js";
import { CourseManager } from "./courseManager.js";

export class UI {
    static editState = {
        isEditing: false,
        currentId: null
    };

    static enterEditMode(id) {
        const student = StudentManager.getStudents().find(s => s.id === id);
        const instructor = InstructorManager.getInstructors().find(i => i.id === id);
        const course = CourseManager.getCourses().find(c => c.id === id);

        if (student) {
            document.getElementById("student-first-name").value = student.firstName;
            document.getElementById("student-last-name").value = student.lastName;
            document.getElementById("student-email").value = student.email;
            document.querySelector(".form--student .form__button").textContent = "Edit";
        } else if (instructor) {
            document.getElementById("instructor-first-name").value = instructor.firstName;
            document.getElementById("instructor-last-name").value = instructor.lastName;
            document.getElementById("instructor-email").value = instructor.email;
            document.querySelector(".form--instructor .form__button").textContent = "Edit";
        } else if (course) {
            document.getElementById("course-name").value = course.name;
            document.getElementById("course-code").value = course.code;
            document.querySelector(".form--course .form__button").textContent = "Edit";
        }

        this.editState.isEditing = true;
        this.editState.currentId = id;
    }

    static clearEditState() {
        this.editState.isEditing = false;
        this.editState.currentId = null;
    }

    /*** STUDENT UI ***/
    static displayStudents() {
        const students = StudentManager.getStudents();
        const studentTable = document.querySelector(".table__body--student");

        studentTable.innerHTML = ""; 
        students.forEach(student => UI.addStudentToTable(student));
    }

    static addStudentToTable(student) {
        const studentTable = document.querySelector(".table__body--student");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.id}</td>
            <td>
                 <button class="delete-student" data-id="${student.id}">Delete</button>
                 <button class="edit-student" data-id="${student.id}">Edit</button>
            </td>
        `;

        // DELETE BUTTON
        studentTable.appendChild(row);
        document.querySelector(".table__body--student").addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-student")) {
                const studentId = event.target.getAttribute("data-id");
        
                if (confirm("Er du sikker på at du vil slette denne studenten?")) {
                    StudentManager.deleteStudent(studentId);
                    UI.displayStudents(); 
                }
            }
        });
        
    }

    
    



    // DELETE BUTTON
    static removeStudentFromTable(studentId) {
        const row = document.querySelector(`.delete-student[data-id="${studentId}"]`)?.closest("tr");
    
        if (!row) {
            console.log(`Student with ID ${studentId} not found in table.`);
            return;
        }
    
        row.remove();  
    }

    // EDIT BUTTON 



    /*** INSTRUCTOR UI ***/
    static displayInstructors() {

        const instructors = InstructorManager.getInstructors();
        const instructorTableBody = document.querySelector(".table__body--instructor");

        instructorTableBody.innerHTML = "";
        instructors.forEach(instructor => UI.addInstructorToTable(instructor));
    }

    static addInstructorToTable(instructor) {
        const instructorTable = document.querySelector(".table__body--instructor");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${instructor.firstName}</td>
            <td>${instructor.lastName}</td>
            <td>${instructor.email}</td>
            <td>${instructor.id}</td>
            <td>
                <button class="delete-instructor" data-id="${instructor.id}">Delete</button>
                <button class="edit-instructor" data-id="${instructor.id}">Edit</button>
            </td>
        `;

        instructorTable.appendChild(row);
    }

    static removeInstructorFromTable(instructorId) {
        const row = document.querySelector(`.delete-instructor[data-id="${instructorId}"]`)?.closest("tr");
    
        if (!row) {
            console.log(`Instructor with ID ${instructorId} not found in table.`);
            return;
        }
    
        row.remove(); 
    }

    // EDIT BUTTON 



    /*** COURSE UI ***/
    static displayCourses() {
        const courses = CourseManager.getCourses();
        const courseTable = document.querySelector(".table__body--course");

        courseTable.innerHTML = ""; 
        courses.forEach(course => UI.addCourseToTable(course));
    }

    static addCourseToTable(course) {
        const courseTable = document.querySelector(".table__body--course");
        const row = document.createElement("tr");

        row.setAttribute("data-course-id", course.id);

        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.code}</td>
            <td>
                <button class="delete-course" data-id="${course.id}">Delete</button>
                <button class="edit-course" data-id="${course.id}">Edit</button>
            </td>
        `;

        courseTable.appendChild(row);
    }

    static removeCourseFromTable(courseId) {
        const row = document.querySelector(`tr[data-course-id="${courseId}"]`);
    
        if (!row) {
            console.warn(`Course with ID ${courseId} not found in table.`);
            return;
        }
    
        row.remove();  
    }
            // viser kurs studentene har meldt seg opp til 
    static displayStudentCourses() {
        const students = StudentManager.getStudents();
        const courses = CourseManager.getCourses();
        const studentCourseTable = document.querySelector(".table__body--student-courses");
        

    
        studentCourseTable.innerHTML = ""; // Rens tabellen før oppdatering
    
        students.forEach(student => {
            if (!student.courses || student.courses.length === 0) {
                return; // Hopp over studenter uten kurs
            }
    
            const enrolledCourses = student.courses.map(courseId => {
                const course = courses.find(c => c.id === courseId);
                return course ? `${course.name} (${course.code})` : "Unknown Course";
            }).join(", ");
    
            const row = document.createElement("tr");
    
            row.innerHTML = `
                <td>${student.firstName} ${student.lastName}</td>
                <td>${enrolledCourses}</td>
                <td>
                    <button class="delete-enrollment" data-id="${student.id}">Remove</button>
                </td>
            `;
    
            studentCourseTable.appendChild(row);
            

        });
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-enrollment")) {
                const studentId = event.target.getAttribute("data-id");
                const courseId = prompt("Skriv inn kurskoden for å fjerne studenten fra kurset:");
        
                if (courseId) {
                    const result = StudentManager.removeStudentFromCourse(studentId, courseId);
                    if (result === true) {
                        UI.displayStudentCourses(); // Oppdater visning etter sletting
                        alert("Kurs fjernet fra studentens liste.");
                    } else {
                        alert("Kunne ikke finne studenten eller kurset.");
                    }
                }
            }
        });
    }
    
  
    // EDIT BUTTON FIX!!! 


    /*** ASSIGN INSTRUCTOR TO COURSES UI ***/
    static populateInstructorAndCourseDropdowns() {
        const instructorDropdown = document.getElementById("assign-instructor");
        const courseDropdown = document.getElementById("assign-course");
    
        instructorDropdown.innerHTML = "";
        courseDropdown.innerHTML = "";
    
        const instructors = InstructorManager.getInstructors();
        const courses = CourseManager.getCourses();
    
        instructors.forEach(instructor => {
            const option = document.createElement("option");
            option.value = instructor.id;
            option.textContent = `${instructor.firstName} ${instructor.lastName}`;
            instructorDropdown.appendChild(option);
        });
    
        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course.id;
            option.textContent = `${course.name} (${course.code})`;
            courseDropdown.appendChild(option);
        });
    }

    static displayInstructorCourses() {
        const instructorTableBody = document.querySelector(".table__body--instructor-courses");
        if (!instructorTableBody) return; 
    
        instructorTableBody.innerHTML = ""; 
    
        const instructors = InstructorManager.getInstructors();
        const courses = CourseManager.getCourses();
    
        instructors.forEach(instructor => {
            if (!instructor.courses) instructor.courses = [];
    
            const instructorCourses = instructor.courses
                .map(courseId => {
                    const course = courses.find(courseItem => courseItem.id === courseId);
                    return course ? `${course.name} (${course.code})` : "";
                })
                .filter(courseText => courseText !== "") 
                .join(", ");
    

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${instructor.firstName} ${instructor.lastName}</td>
                <td>${instructor.email}</td>
                <td>${instructorCourses || "<p>-</p>"}</td>
            `;
    
            instructorTableBody.appendChild(row);
        });
    }


    static updateDropdowns() {
        UI.populateInstructorAndCourseDropdowns();
    }


    /*** COURSE OVERVIEW UI ***/
    static displayCourseOverview() {
        const courses = CourseManager.getCourses();
        const instructors = InstructorManager.getInstructors();
        const students = StudentManager.getStudents();
        const courseOverviewTable = document.querySelector(".table__body--course-overview");
    
        if (!courseOverviewTable) return;
    
        courseOverviewTable.innerHTML = ""; // Rens tabellen før oppdatering
    
        courses.forEach(course => {
            const instructor = instructors.find(inst => inst.courses && inst.courses.includes(course.id)) || { firstName: "-", lastName: "-" };
            const enrolledStudents = students.filter(student => student.courses && student.courses.includes(course.id))
                                             .map(student => `${student.firstName} ${student.lastName}`)
                                             .join(", ") || "-";
    
            const row = document.createElement("tr");
    
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.code}</td>
                <td>${instructor.firstName} ${instructor.lastName}</td>
                <td>${enrolledStudents}</td>
            `;
    
            courseOverviewTable.appendChild(row);
        });
    }
}


    

//  MOHAMMED OCH LINNEA: 
/* import { StudentManager } from "./studentManager.js";
import { InstructorManage } from "./instructorManage.js";

const studentTableBody = document.querySelector(".table__body--student");
const instructorTableBody = document.querySelector(".table__body--instructor");

export function displayStudents() {
    studentTableBody.innerHTML = "";
    StudentManager.getStudents().forEach(student => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const idCell = document.createElement("td");
        idCell.textContent = student.id;

        const coursesCell = document.createElement("td");
        coursesCell.textContent = student.courses.join(", ") || "No courses";

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editStudent(student.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            StudentManager.deleteStudent(student.id);
            displayStudents();
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idCell);
        row.appendChild(coursesCell);
        row.appendChild(actionsCell);

        studentTableBody.appendChild(row);
    });
}

export function editStudent(id) {
    const students = StudentManager.getStudents();
    const student = students.find(s => s.id === id);

    if (!student) return;

    const newName = prompt("Enter new name:", student.name);
    const newEmail = prompt("Enter new email:", student.email);

    if (newName && newEmail) {
        StudentManager.updateStudent(id, newName, newEmail);
        displayStudents();
    }
}

export function displayInstructors() {
    instructorTableBody.innerHTML = "";
    InstructorManage.getInstructors().forEach(instructor => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = instructor.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = instructor.email;

        const idCell = document.createElement("td");
        idCell.textContent = instructor.id;

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editInstructor(instructor.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            InstructorManage.deleteInstructor(instructor.id);
            displayInstructors();
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idCell);
        row.appendChild(actionsCell);

        instructorTableBody.appendChild(row);
    });
}

export function editInstructor(id) {
    const instructors = InstructorManage.getInstructors();
    const instructor = instructors.find(i => i.id === id);

    if (!instructor) return;

    const newName = prompt("Enter new name:", instructor.name);
    const newEmail = prompt("Enter new email:", instructor.email);

    if (newName && newEmail) {
        InstructorManage.updateInstructor(id, newName, newEmail);
        displayInstructors();
    }
}

 */