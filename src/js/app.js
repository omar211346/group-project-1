import { StudentManager } from "./studentManager.js";
import { InstructorManager } from "./instructorManager.js";
import { CourseManager } from "./courseManager.js";
import { UI } from "./ui.js";
import { Student, Instructor, Course } from "./models.js";


document.addEventListener("DOMContentLoaded", () => {
    UI.displayStudents();
    UI.displayInstructors();
    UI.displayCourses();
    UI.populateInstructorAndCourseDropdowns();
    UI.displayInstructorCourses();
});

/*** STUDENT MANAGEMENT ***/
document.querySelector(".form--student").addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("student-first-name").value.trim();
    const lastName = document.getElementById("student-last-name").value.trim();
    const email = document.getElementById("student-email").value.trim();

    if (UI.editState.isEditing) {
        StudentManager.updateStudent(UI.editState.currentId, firstName, lastName, email);
        UI.displayStudents();
        document.querySelector(".form--student .form__button").textContent = "Add";
        UI.clearEditState();
    } else {
        const newStudent = new Student(firstName, lastName, email);
        StudentManager.addStudent(newStudent);
        UI.addStudentToTable(newStudent);
    }

    document.getElementById("student-first-name").value = "";
    document.getElementById("student-last-name").value = "";
    document.getElementById("student-email").value = "";
});

/*** INSTRUCTOR MANAGEMENT ***/
document.querySelector(".form--instructor").addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("instructor-first-name").value.trim();
    const lastName = document.getElementById("instructor-last-name").value.trim();
    const email = document.getElementById("instructor-email").value.trim();

    if (UI.editState.isEditing) {
        InstructorManager.updateInstructor(UI.editState.currentId, firstName, lastName, email);
        UI.displayInstructors();
        document.querySelector(".form--instructor .form__button").textContent = "Add";
        UI.clearEditState();
    } else {
        const newInstructor = new Instructor(firstName, lastName, email);
        InstructorManager.addInstructor(newInstructor);
        UI.addInstructorToTable(newInstructor);
        UI.updateDropdowns();
    }

    document.getElementById("instructor-first-name").value = "";
    document.getElementById("instructor-last-name").value = "";
    document.getElementById("instructor-email").value = "";
});

/*** COURSE MANAGEMENT ***/
document.querySelector(".form--course").addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = document.getElementById("course-name").value.trim();
    const courseCode = document.getElementById("course-code").value.trim();

    try {
        if (UI.editState.isEditing) {
            CourseManager.updateCourse(UI.editState.currentId, { name: courseName, code: courseCode });
            UI.displayCourses();
            document.querySelector(".form--course .form__button").textContent = "Add";
            UI.clearEditState();
        } else {
            const newCourse = new Course(courseName, courseCode);
            CourseManager.addCourse(newCourse);
            UI.addCourseToTable(newCourse);
            UI.updateDropdowns();
        }

        document.getElementById("course-name").value = "";
        document.getElementById("course-code").value = "";
    } catch (error) {
        UI.showAlert(error.message, "error");
    }
});

/*** ASSIGN INSTRUCTOR TO COURSES ***/
document.querySelector(".form--assign").addEventListener("submit", (event) => {
    event.preventDefault();

    const instructorId = document.getElementById("assign-instructor").value;
    const courseId = document.getElementById("assign-course").value;

    const result = InstructorManager.assignCourseToInstructor(instructorId, courseId);

    if (result === true) {
        UI.displayInstructorCourses(); // 
        console.log("Instructor successfully assigned to course!");
    } else {
        console.log(result); 
    }
});



// EVENTLISTENERS
/*** DELETE & EDIT BUTTON STUDENT ***/
document.querySelector(".table__body--student").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-student")) {
        const studentId = event.target.getAttribute("data-id");
        if (StudentManager.deleteStudent(studentId)) {
            UI.removeStudentFromTable(studentId);
        }
    } else if (event.target.classList.contains("edit-student")) {
        const studentId = event.target.getAttribute("data-id");
        UI.enterEditMode(studentId);
    }
});

/*** DELETE & EDIT BUTTON INSTRUCTOR ***/
document.querySelector(".table__body--instructor").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-instructor")) {
        const instructorId = event.target.getAttribute("data-id");
        if (InstructorManager.deleteInstructor(instructorId)) {
            UI.removeInstructorFromTable(instructorId);
        }
    } else if (event.target.classList.contains("edit-instructor")) {
        const instructorId = event.target.getAttribute("data-id");
        UI.enterEditMode(instructorId);
    }
});

/*** DELETE & EDIT BUTTON COURSE ***/
document.querySelector(".table__body--course").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-course")) {
        const courseId = event.target.getAttribute("data-id");
        if (CourseManager.deleteCourse(courseId)) {
            UI.removeCourseFromTable(courseId);
        }
    } else if (event.target.classList.contains("edit-course")) {
        const courseId = event.target.getAttribute("data-id");
        UI.enterEditMode(courseId);
    }
});

// * EDIT INSTRUCTOR



/*** NAVIGATION ***/
const studentSection = document.querySelector("#student");
const instructorSection = document.querySelector("#instructor");
const courseSection = document.querySelector("#course");
const enrollmentSection = document.querySelector("#enrollment");
const assignSection = document.querySelector("#assign");
const courseOverviewSection = document.querySelector("#course-overview");

const studentBtn = document.querySelector("#student-btn");
const instructorBtn = document.querySelector("#instructor-btn");
const courseBtn = document.querySelector("#course-btn");
const enrollmentBtn = document.querySelector("#enrollment-btn");
const assignBtn = document.querySelector("#assign-btn");
const courseOverviewBtn = document.querySelector("#course-overview-btn");

function hideAllSections() {
    const sections = [
        studentSection,
        instructorSection,
        courseSection,
        enrollmentSection,
        assignSection,
        courseOverviewSection,
    ];
    sections.forEach(section => section.classList.add("hidden"));
}

studentBtn.addEventListener("click", () => {
    hideAllSections();
    studentSection.classList.remove("hidden");
});

instructorBtn.addEventListener("click", () => {
    hideAllSections();
    instructorSection.classList.remove("hidden");
});

courseBtn.addEventListener("click", () => {
    hideAllSections();
    courseSection.classList.remove("hidden");
});

enrollmentBtn.addEventListener("click", () => {
    hideAllSections();
    enrollmentSection.classList.remove("hidden");
});

assignBtn.addEventListener("click", () => {
    hideAllSections();
    assignSection.classList.remove("hidden");
});

courseOverviewBtn.addEventListener("click", () => {
    hideAllSections();
    courseOverviewSection.classList.remove("hidden");
});