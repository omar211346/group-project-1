import { StudentManager } from "./studentManager.js";
import { InstructorManager } from "./instructorManager.js";
import { CourseManager } from "./courseManager.js";
import { UI } from "./ui.js";
import { Student, Instructor, Course } from "./models.js";

import { populateStudentDropdown, populateCourseDropdown} from "./enrollment.js";

document.addEventListener("DOMContentLoaded", () => {
    populateStudentDropdown();
    populateCourseDropdown();
});



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

    const newStudent = new Student(firstName, lastName, email);
    StudentManager.addStudent(newStudent);
    UI.addStudentToTable(newStudent);

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

    const newInstructor = new Instructor(firstName, lastName, email);
    InstructorManager.addInstructor(newInstructor);
    UI.addInstructorToTable(newInstructor);
    UI.updateDropdowns(); 

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
        const newCourse = new Course(courseName, courseCode);
        CourseManager.addCourse(newCourse);
        UI.addCourseToTable(newCourse);
        UI.updateDropdowns(); 

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

/*** DELETE & EDIT BUTTON INSTRUCTOR ***/
document.querySelector(".table__body--instructor").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-instructor")) {
        const instructorId = event.target.getAttribute("data-id");

        if (InstructorManager.deleteInstructor(instructorId)) {  // remove from localStorage
            UI.removeInstructorFromTable(instructorId);  
            console.log(`${instructorId} was deleted.`);
        } else {
            console.console.log(`${instructorId} not found.`);
        }
    }
});


// * EDIT INSTRUCTOR



/*** DELETE & EDIT BUTTON COURSE ***/
document.querySelector(".table__body--course").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-course")) {
        const courseId = event.target.getAttribute("data-id");

        if (CourseManager.deleteCourse(courseId)) {  
            UI.removeCourseFromTable(courseId);  
            console.log(`${courseId} was deleted.`);
        } else {
            console.log(`${courseId} not found.`);
        }
    }
});

// * EDIT COURSE



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
// import { StudentManager } from "./studentManager.js";
// import { InstructorManager } from "./instructorManager.js";
// import { CourseManager } from "./courseManager.js";
// import { UI } from "./ui.js";
// import { Student, Instructor, Course } from "./models.js";
// import { populateStudentDropdown, populateCourseDropdown, handleEnrollment, updateStudentCoursesUI } from "./enrollment.js";

// Event Listeners for data population and student course display
// document.addEventListener("DOMContentLoaded", () => {
//     populateStudentDropdown();
//     populateCourseDropdown();
//     UI.displayStudentCourses();
// });

// /*** STUDENT MANAGEMENT ***/
// document.querySelector(".form--student").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const firstName = document.getElementById("student-first-name").value.trim();
//     const lastName = document.getElementById("student-last-name").value.trim();
//     const email = document.getElementById("student-email").value.trim();

//     const newStudent = new Student(firstName, lastName, email);
//     StudentManager.addStudent(newStudent);
//     UI.addStudentToTable(newStudent);

//     document.getElementById("student-first-name").value = "";
//     document.getElementById("student-last-name").value = "";
//     document.getElementById("student-email").value = "";
// });

// /*** INSTRUCTOR MANAGEMENT ***/
// document.querySelector(".form--instructor").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const firstName = document.getElementById("instructor-first-name").value.trim();
//     const lastName = document.getElementById("instructor-last-name").value.trim();
//     const email = document.getElementById("instructor-email").value.trim();

//     const newInstructor = new Instructor(firstName, lastName, email);
//     InstructorManager.addInstructor(newInstructor);
//     UI.addInstructorToTable(newInstructor);
//     UI.updateDropdowns(); 

//     document.getElementById("instructor-first-name").value = "";
//     document.getElementById("instructor-last-name").value = "";
//     document.getElementById("instructor-email").value = "";
// });

// /*** COURSE MANAGEMENT ***/
// document.querySelector(".form--course").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const courseName = document.getElementById("course-name").value.trim();
//     const courseCode = document.getElementById("course-code").value.trim();

//     try {
//         const newCourse = new Course(courseName, courseCode);
//         CourseManager.addCourse(newCourse);
//         UI.addCourseToTable(newCourse);
//         UI.updateDropdowns(); 

//         document.getElementById("course-name").value = "";
//         document.getElementById("course-code").value = "";
//     } catch (error) {                                            
//         UI.showAlert(error.message, "error");
//     }
// });

// /*** ASSIGN INSTRUCTOR TO COURSES ***/
// document.querySelector(".form--assign").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const instructorId = document.getElementById("assign-instructor").value;
//     const courseId = document.getElementById("assign-course").value;

//     const result = InstructorManager.assignCourseToInstructor(instructorId, courseId);

//     if (result === true) {
//         UI.displayInstructorCourses(); 
//         console.log("Instructor successfully assigned to course!");
//     } else {
//         console.log(result); 
//     }
// });

// /*** ENROLLMENT MANAGEMENT ***/
// document.querySelector(".form--enrollment").addEventListener("submit", handleEnrollment);

// /*** DELETE STUDENT ENROLLMENT ***/
// document.querySelector(".table__body--student-courses").addEventListener("click", (event) => {
//     if (event.target.classList.contains("delete-enrollment")) {
//         const studentId = event.target.getAttribute("data-id");
//         const courseId = prompt("Skriv inn kurskoden for å fjerne studenten fra kurset:");

//         if (courseId) {
//             const result = StudentManager.removeStudentFromCourse(studentId, courseId);
//             if (result === true) {
//                 UI.displayStudentCourses();  // Oppdater tabellen visuelt
//                 alert("Kurs fjernet fra studentens liste.");
//             } else {
//                 alert("Kunne ikke finne studenten eller kurset.");
//             }
//         }
//     }
// });

// /*** NAVIGATION ***/
// const studentSection = document.querySelector("#student");
// const instructorSection = document.querySelector("#instructor");
// const courseSection = document.querySelector("#course");
// const enrollmentSection = document.querySelector("#enrollment");
// const assignSection = document.querySelector("#assign");
// const courseOverviewSection = document.querySelector("#course-overview");

// const studentBtn = document.querySelector("#student-btn");
// const instructorBtn = document.querySelector("#instructor-btn");
// const courseBtn = document.querySelector("#course-btn");
// const enrollmentBtn = document.querySelector("#enrollment-btn");
// const assignBtn = document.querySelector("#assign-btn");
// const courseOverviewBtn = document.querySelector("#course-overview-btn");

// function hideAllSections() {
//     const sections = [
//         studentSection,
//         instructorSection,
//         courseSection,
//         enrollmentSection,
//         assignSection,
//         courseOverviewSection,
//     ];
//     sections.forEach(section => section.classList.add("hidden"));
// }

// studentBtn.addEventListener("click", () => {
//     hideAllSections();
//     studentSection.classList.remove("hidden");
// });

// instructorBtn.addEventListener("click", () => {
//     hideAllSections();
//     instructorSection.classList.remove("hidden");
// });

// courseBtn.addEventListener("click", () => {
//     hideAllSections();
//     courseSection.classList.remove("hidden");
// });

// enrollmentBtn.addEventListener("click", () => {
//     hideAllSections();
//     enrollmentSection.classList.remove("hidden");
// });

// assignBtn.addEventListener("click", () => {
//     hideAllSections();
//     assignSection.classList.remove("hidden");
// });

// courseOverviewBtn.addEventListener("click", () => {
//     hideAllSections();
//     courseOverviewSection.classList.remove("hidden");
// });