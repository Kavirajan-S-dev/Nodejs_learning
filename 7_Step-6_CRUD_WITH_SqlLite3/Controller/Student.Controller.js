const db = require("./../db.config");

exports.checkParamsId = (req, res, next, id) => {
    try {
        const query = 'SELECT * FROM student WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ status: "Internal Server Error", error: err.message });
            }
            if (!row) {
                return res.status(404).json({ status: "Not Found", error: "User not found" });
            }
            req.student = row;
            next();
        });
    } catch (error) {
        return res.status(400).json({ status: "Bad Request", error: error.message });
    }
};

// Used to check the payload in a body
exports.checkPayloadPost = (req, res, next) => {
    if (!req.body?.name || !req.body?.age || !req.body?.major) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" })
    }
    next();
};

exports.checkPayloadPut = (req, res, next) => {
    if (!req.body?.name || !req.body?.age) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" })
    }
    next();
};

exports.checkPayloadPatch = (req, res, next) => {
    if (!req.body?.major) {
        return res.status(400).json({ status: "Bad Request", error: "Payload is missing some fields" })
    }
    next();
};

exports.onHandleGet = (_req, res) => {
    const query = `SELECT * FROM Student`
    try {
        res.set("content-type", "application/json");
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.status(200).send(JSON.stringify(rows))
        });
    } catch (error) {
        return res.status(400).json({ status: "Bad Request", error: error })
    }
};

exports.onHandlePost = (req, res) => {
    try {
        const query = `
            INSERT INTO student(name, age, major) VALUES (?, ?, ?)
        `;
        db.run(query, [req.body.name, req.body.age, req.body.major], function (err) {
            if (err) {
                return res.status(400).json({ status: "Bad Request", error: err.message });
            }
            return res.status(201).json({
                status: "Success",
                data: `Student with ID ${this.lastID} saved.`
            });
        });

    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", error: error.message });
    }
};

exports.onHandleGetById = (req, res) => {
    return res.json(req.student);
};

exports.onHandleUpdate = (req, res) => {
    try {
        const query = `UPDATE student SET name = ? , age = ? WHERE id = ?`;
        db.run(query, [req.body.name, req.body.age, req.student.id], (err) => {
            res.set("content-type", "application/json");
            if (err) throw err;
            if (this.changes) {
                return res.status(200).send(JSON.stringify({ message: `Student ${req.student.id} replaced.` }));
            };
        })
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", error: error.message });
    }
};

exports.onHandlePatch = (req, res) => {
    try {
        const query = `UPDATE student SET major = ? WHERE id = ?`;
        db.run(query, [], (err) => {
            res.set("content-type", "application/json");
            if (err) throw err;
            return res.status(200).send(JSON.stringify({ message: `Student ${req.student.id} replaced.` }));
        });
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", error: error.message });
    }
};

exports.onHandleDelete = (req, res) => {
    try {
        const query = `DELETE FROM student WHERE id = ?`;
        db.run(query, [req.student.id], (err) => {
            res.set("content-type", "application/json");
            if (err) throw err;
            return res.status(204).send(null);
        });
    } catch (err) {
        return res.status(500).json({ status: "Internal Server Error", error: error.message });
    };
};