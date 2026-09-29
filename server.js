const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());


// Temporary student data
let students = [
    {
        id: 1,
        name: "Sivaranjini",
        department: "Information Technology",
        year: 3
    },
    {
        id: 2,
        name: "Priya",
        department: "Computer Science",
        year: 3
    },
    {
        id: 3,
        name: "Arun",
        department: "Information Technology",
        year: 2
    }
];


// ========================================
// GET - Get all students
// ========================================

app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});


// ========================================
// GET - Get student by ID
// ========================================

app.get("/api/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// ========================================
// POST - Add a new student
// ========================================

app.post("/api/students", (req, res) => {

    const { name, department, year } = req.body;

    // Check required fields
    if (!name || !department || !year) {
        return res.status(400).json({
            message: "Name, department and year are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,

        name: name,
        department: department,
        year: year
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// ========================================
// PUT - Update a student
// ========================================

app.put("/api/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, department, year } = req.body;

    if (!name || !department || !year) {
        return res.status(400).json({
            message: "Name, department and year are required"
        });
    }

    student.name = name;
    student.department = department;
    student.year = year;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// ========================================
// DELETE - Delete a student
// ========================================

app.delete("/api/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// ========================================
// Invalid route
// ========================================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// ========================================
// Start server
// ========================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});