import { StudentManager } from "./studentManager.js";
import { CourseManager } from "./courseManager.js";
import { UI } from "./ui.js";

const studentSelect = document.querySelector("#enroll-student");
const courseSelect = document.querySelector("#enroll-course");
const enrollForm = document.querySelector(".form--enrollment");

//  Fyll dropdown med studenter ved å bruke UI.js
function populateStudentDropdown() {
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
function populateCourseDropdown() {
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
function handleEnrollment(event) {
    event.preventDefault();

    const studentId = studentSelect.value;
    const courseId = courseSelect.value;

    const result = StudentManager.enrollStudentInCourse(studentId, courseId);

    if (result === true) {
        UI.updateStudentCourseTable(); // Oppdater tabellen visuelt
        updateStudentCoursesUI(); // Oppdater listen over studentens kurs
        alert("Student ble meldt opp i kurset!");
    } else {
        alert(result);
    }
}

// Oppdater visning av hvilke kurs studenten er påmeldt i
function updateStudentCoursesUI() {
    const studentId = studentSelect.value;
    const students = StudentManager.getStudents();
    const student = students.find(s => s.id === studentId);

    const coursesList = document.querySelector(".student-courses-list");
    coursesList.innerHTML = ""; // Tøm listen før oppdatering

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


enrollForm.addEventListener("submit", handleEnrollment);
studentSelect.addEventListener("change", updateStudentCoursesUI);

t
populateStudentDropdown();
populateCourseDropdown();
updateStudentCoursesUI();
