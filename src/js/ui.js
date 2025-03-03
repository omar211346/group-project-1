import { StudentManager } from "./studentManager.js";
import { InstructorManager } from "./instructorManager.js";
import { CourseManager } from "./courseManager.js";


export class UI {
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

        studentTable.appendChild(row);
    }

    // DELETE BUTTON

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
                <button class="edit-student" data-id="${instructor.id}">Edit</button>
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