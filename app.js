let students = [];
let studentSet = new Set();
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const gradeInput = document.getElementById('grade');
const entriesDiv = document.getElementById('entries');
const saveBtn = document.getElementById('saveBtn');
const manualSubmit = document.getElementById('manualSubmit');
const averageGradeEl = document.getElementById('averageGrade');
const userInfoDiv = document.getElementById('userInfo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);

    if (!name || isNaN(grade)) return;

    if (studentSet.has(name)) {
        alert("student already exists!");
        return;
    }

    studentSet.add(name);
    students.push({ name, grade });

    const div = document.createElement('div');
    div.className = 'card p-3 shadow-sm';
    div.innerHTML = `<strong>${name}</strong> - Grade: ${grade}`;
    entriesDiv.appendChild(div);

    updateAverage();
    nameInput.value = '';
    gradeInput.value = '';
});


saveBtn.addEventListener('click', () => {
    localStorage.setItem('students', JSON.stringify(students));
    form.requestSubmit();
});

function updateAverage() {
    if (students.length === 0) {
        averageGradeEl.textContent = "Average: N/A";
        return;
    }
    const total = students.reduce((sum, s) => sum + s.grade, 0);
    const avg = (total / students.length).toFixed(2);
    averageGradeEl.textContent = `Average: ${avg}`;
}

async function fetchUserData() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const usernames = data.map(user => `<span class="badge bg-secondary me-1">${user.username}</span>`).join('');
        userInfoDiv.innerHTML = `
          <div><strong>Users:</strong> ${usernames}</div>
          <div><strong>Total:</strong> ${data.length}</div>
        `;
    } catch (error) {
        window.alert('Erro when fetching data')
    }
}

fetchUserData();
/*
function addStudent(name, grade) {
    if (!name || isNaN(grade)) return;
    if (studentSet.has(name)) {
        alert('student already exists');
        return;
    }

    let newName = { name: name, grade: grade }

    students.push(newName);
    studentSet.add(name);
    $("#entries").append(`
                <div class="entry">
                    <p>${name}</p> 
                    <p>${grade}</p>
                </div>
                `)
    updateAverage();
    $('#name').val('');
    $('#grade').val('');
    return students;
}

$("#saveBtn").on('click', function (e) {
    localStorage.setItem('students', JSON.stringify(students));
});

async function fetchUserData() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log(data);

        for (let item of data) {
            $('#userInfo').append(`
            <div><strong>User:</strong> ${item.username}</div>
            `);
        }

        $('#userInfo').append(`
          <div><strong>Total:</strong> ${data.length}</div>
        `);
    } catch (error) {
        window.alert('Error when fetching data')
    }
}

    function updateAverage() {
      if (students.length === 0) {
        $('#averageGrade') = "Average: N/A";
        return;
      }
      const total = students.reduce((sum, s) => sum + s.grade, 0);
      const avg = (total / students.length).toFixed(2);
      averageGradeEl.textContent = `Average Grade: ${avg}`;
    }


$("#studentForm").on("submit", function (e) {
    e.preventDefault();

    const name = $('#name').val();
    const grade = parseFloat($('#grade').val());
    addStudent(name, grade.toFixed(2));
});

$(document).ready(function () {
    fetchUserData();
});*/