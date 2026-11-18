
const form = document.getElementById('courseForm');
const table = document.getElementById('courseTable');
async function loadCourses() {
    const response = await fetch('/courses');
    const courses = await response.json();

    table.innerHTML = '';

    courses.forEach(course => {
        const row = document.createElement('tr');

        [course.id, course.coursename,
         course.coursecode, course.department].forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';

        deleteButton.onclick = async () => {
            await fetch(`/courses/${course.id}`, {
                method: 'DELETE'
            });
            loadCourses();
        };

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const course = {
        coursename: document.getElementById('coursename').value,
        coursecode: document.getElementById('coursecode').value,
        department: document.getElementById('department').value
    };

    const response = await fetch('/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    });

    if (response.ok) {
        form.reset();
        loadCourses();
    } else {
        alert('Please enter all course details');
    }
});

loadCourses();
