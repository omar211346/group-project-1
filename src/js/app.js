const studentSection = document.querySelector ("#student");
const instructorSection = document.querySelector ("#instructor");
const courseSection = document.querySelector ("#course");
const enrollmentSection = document.querySelector ("#enrollment");
const assignSection = document.querySelector ("#assign");
const studentbtn = document.querySelector ("#student-btn");
const instructorbtn = document.querySelector ("#instructor-btn");
const coursebtn = document.querySelector ("#course-btn");
const enrollmentbtn = document.querySelector ("#enrollment-btn");
const assignbtn = document.querySelector ("#assign-btn");


function hideAllsections () {
    studentSection.classList.add('hidden');
    assignSection.classList.add('hidden');
    courseSection.classList.add('hidden');
    instructorSection.classList.add('hidden');
    enrollmentSection.classList.add('hidden');
}

studentbtn.addEventListener('click', () => {
    hideAllsections();
    studentSection.classList.remove('hidden');
});

instructorbtn.addEventListener('click', () => {
    hideAllsections();
    instructorSection.classList.remove('hidden');
})

coursebtn.addEventListener('click', () => {
    hideAllsections();
    courseSection.classList.remove('hidden');
})

enrollmentbtn.addEventListener('click', () => {
    hideAllsections();
    enrollmentSection.classList.remove('hidden');
})

assignbtn.addEventListener('click', () => {
    hideAllsections();
    assignSection.classList.remove('hidden');
})


