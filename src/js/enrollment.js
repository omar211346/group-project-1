import {Student} from "./student.js";

const students = JSON.parse(localStorage.getItem("students")) || [];
const studentSelect = document.querySelector("#enroll-student");
const courseSelect = document.querySelector("#enroll-course");
const enrollForm = document.querySelector(".form--enrollment");

function populateCourseDropdown() {
    courseSelect.innerHTML = ""; 

    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.name; 
        option.textContent = course.name; 
        courseSelect.appendChild(option);
    });
}

populateCourseDropdown(); 

