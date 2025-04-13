const db = require("./../db.config");

// Middleware: Check if student with given ID exists
exports.checkParamsId = (req, res, next, id) => {
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ status: "Internal Server Error", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: "Not Found", error: "User not found" });
        }
        req.student = results[0];
        next();
    });
};

// Middleware: POST payload validator
exports.checkPayloadPost = (req, res, next) => {
    if (!req.body?.name || !req.body?.age || !req.body?.major) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" });
    }
    next();
};

// Middleware: PUT payload validator
exports.checkPayloadPut = (req, res, next) => {
    if (!req.body?.name || !req.body?.age) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" });
    }
    next();
};

// Middleware: PATCH payload validator
exports.checkPayloadPatch = (req, res, next) => {
    if (!req.body?.major) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" });
    }
    next();
};

// GET all students
exports.onHandleGet = (_req, res) => {
    const query = `SELECT * FROM students`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ status: "Internal Server Error", error: err.message });
        }
        res.status(200).json(results);
    });
};

// POST new student
exports.onHandlePost = (req, res) => {
    const query = `INSERT INTO students (name, age, major) VALUES (?, ?, ?)`;
    const values = [req.body.name, req.body.age, req.body.major];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(400).json({ status: "Bad Request", error: err.message });
        }
        return res.status(201).json({
            status: "Success",
            data: `Student with ID ${result.insertId} saved.`
        });
    });
};

// GET student by ID
exports.onHandleGetById = (req, res) => {
    return res.json(req.student);
};

// PUT: Update student completely
exports.onHandleUpdate = (req, res) => {
    const query = `UPDATE students SET name = ?, age = ? WHERE id = ?`;
    const values = [req.body.name, req.body.age, req.student.id];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ status: "Internal Server Error", error: err.message });
        }
        return res.status(200).json({ message: `Student ${req.student.id} updated.` });
    });
};

// PATCH: Update major only
exports.onHandlePatch = (req, res) => {
    const query = `UPDATE students SET major = ? WHERE id = ?`;
    const values = [req.body.major, req.student.id];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ status: "Internal Server Error", error: err.message });
        }
        return res.status(200).json({ message: `Student ${req.student.id} updated.` });
    });
};

// DELETE student
exports.onHandleDelete = (req, res) => {
    const query = `DELETE FROM students WHERE id = ?`;

    db.query(query, [req.student.id], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "Internal Server Error", error: err.message });
        }
        return res.status(204).send(); 
    });
};
