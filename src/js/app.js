//Importer Student CRUD-moduler 
import { Student } from "./student.js";
import { StudentManager } from "./studentManager.js";
import { displayStudents } from "./ui.js";

//--------------------------------------------
const studentSection = document.querySelector("#student");
const instructorSection = document.querySelector("#instructor");
const courseSection = document.querySelector("#course");
const enrollmentSection = document.querySelector("#enrollment");
const assignSection = document.querySelector("#assign");

const studentbtn = document.querySelector("#student-btn");
const instructorbtn = document.querySelector("#instructor-btn");
const coursebtn = document.querySelector("#course-btn");
const enrollmentbtn = document.querySelector("#enrollment-btn");
const assignbtn = document.querySelector("#assign-btn");

function hideAllSections() {
    studentSection.classList.add('hidden');
    assignSection.classList.add('hidden');
    courseSection.classList.add('hidden');
    instructorSection.classList.add('hidden');
    enrollmentSection.classList.add('hidden');
}

studentbtn.addEventListener('click', () => {
    hideAllSections();
    studentSection.classList.remove('hidden');
});

instructorbtn.addEventListener('click', () => {
    hideAllSections();
    instructorSection.classList.remove('hidden');
});

coursebtn.addEventListener('click', () => {
    hideAllSections();
    courseSection.classList.remove('hidden');
});

enrollmentbtn.addEventListener('click', () => {
    hideAllSections();
    enrollmentSection.classList.remove('hidden');
});

assignbtn.addEventListener('click', () => {
    hideAllSections();
    assignSection.classList.remove('hidden');
});

//Student CRUD-funksjonalitet 
const studentForm = document.querySelector(".form--student");
const studentNameInput = document.querySelector("#student-name");
const studentEmailInput = document.querySelector("#student-email");
const studentIdInput = document.querySelector("#student-id");

// student når skjemaet sendes
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = studentNameInput.value.trim();
    const email = studentEmailInput.value.trim();
    const id = studentIdInput.value.trim();

    if (!name || !email || !id) {
        alert("Please fill in all fields!");
        return;
    }

    const students = StudentManager.getStudents();
    if (students.some(student => student.id === id)) {
        alert("Student ID already exists!");
        return;
    }

    const newStudent = new Student(name, email, id);
    StudentManager.addStudent(newStudent);
    displayStudents();
    studentForm.reset();
});

// Laster inn studentene når siden starter
document.addEventListener("DOMContentLoaded", displayStudents);
