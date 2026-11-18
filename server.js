
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let courses = [
    {
        id: 1,
        coursename: "FSD WORKSHOP 1",
        coursecode: "25VA351",
        department: "CSE-DS"
    },
    {
        id: 2,
        coursename: "FSD WORKSHOP 2",
        coursecode: "25VA352",
        department: "CSE-DS"
    },
    {
        id: 3,
        coursename: "FSD WORKSHOP 3",
        coursecode: "25VA353",
        department: "CSE-DS"
    }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const { coursename, coursecode, department } = req.body;

    if (!coursename || !coursecode || !department) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newCourse = {
        id: courses.length > 0
            ? Math.max(...courses.map(c => c.id)) + 1
            : 1,
        coursename,
        coursecode,
        department
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.delete('/courses/:id', (req, res) => {
    const id = Number(req.params.id);
    const oldLength = courses.length;

    courses = courses.filter(course => course.id !== id);

    if (courses.length === oldLength) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    res.json({ message: "Course deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
