import { StudentManager } from "./studentManager.js";

const studentTableBody = document.querySelector(".table__body--student");

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
