
import { StudentManager } from "./studentManager.js";
import { CourseManager } from "./courseManager.js";
import { UI } from "./ui.js";


const studentSelect = document.querySelector("#enroll-student");
const courseSelect = document.querySelector("#enroll-course");
const enrollForm = document.querySelector(".form--enrollment");

//  Fyll dropdown med studenter ved å bruke UI.js
export function populateStudentDropdown() {
    studentSelect.innerHTML = "";

    const students = StudentManager.getStudents();
    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.firstName} ${student.lastName}`;
        studentSelect.appendChild(option);
    });
}

//  Fyll dropdown med kurs ved å bruke UI.js
export function populateCourseDropdown() {
    courseSelect.innerHTML = "";

    const courses = CourseManager.getCourses();
    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.id;
        option.textContent = `${course.name} (${course.code})`;
        courseSelect.appendChild(option);
    });
}

//  Håndter påmelding av studenter til kurs
export function handleEnrollment(event) {
    event.preventDefault();

    const studentId = studentSelect.value;
    const courseId = courseSelect.value;

    const result = StudentManager.enrollStudentInCourse(studentId, courseId);

    if (result === true) {
        UI.updateStudentCourseTable();
        updateStudentCoursesUI();
        alert("Student ble meldt opp i kurset!");
    } else {
        alert(result);
    }
}



// Oppdater visning av hvilke kurs studenten er påmeldt i
export function updateStudentCoursesUI() {
    const studentId = studentSelect.value;
    const students = StudentManager.getStudents();
    const student = students.find(s => s.id === studentId);

    const coursesList = document.querySelector(".student-courses-list");
    coursesList.innerHTML = "";

    if (!student || student.courses.length === 0) {
        coursesList.innerHTML = "<p>Ingen kurs registrert</p>";
        return;
    }

    student.courses.forEach(courseId => {
        const course = CourseManager.getCourses().find(c => c.id === courseId);
        if (course) {
            const li = document.createElement("li");
            li.textContent = `${course.name} (${course.code})`;
            coursesList.appendChild(li);
        }
    });
}

// Håndter sletting av kurs
document.querySelector(".table__body--student-courses").addEventListener("click", (event) => {
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






// Event Listeners
enrollForm.addEventListener("submit", handleEnrollment);
studentSelect.addEventListener("change", updateStudentCoursesUI);

// Kjør funksjonene ved DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
        populateStudentDropdown();
        populateCourseDropdown();
        updateStudentCoursesUI();
});
// import { StudentManager } from "./studentManager.js";
// import { CourseManager } from "./courseManager.js";
// import { UI } from "./ui.js";

// const studentSelect = document.querySelector("#enroll-student");
// const courseSelect = document.querySelector("#enroll-course");
// const enrollForm = document.querySelector(".form--enrollment");

// // Oppdater visning av studentens kurs
// export function updateStudentCoursesUI() {
//     UI.displayStudentCourses();
// }

// // Håndter påmelding av studenter til kurs
// export function handleEnrollment(event) {
//     event.preventDefault();

//     const studentId = studentSelect.value;
//     const courseId = courseSelect.value;

//     const result = StudentManager.enrollStudentInCourse(studentId, courseId);

//     if (result === true) {
//         UI.displayStudentCourses();  // Oppdater tabellen visuelt
//         alert("Student ble meldt opp i kurset!");
//     } else {
//         alert(result);
//     }
// }


// // Event Listeners
// enrollForm.addEventListener("submit", handleEnrollment);
// document.addEventListener("DOMContentLoaded", () => {
//     UI.displayStudentCourses();
// });
