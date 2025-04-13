const StudentCollections = require("./../Models/Student.Model");

exports.checkParamsId = async (req, res, next, id) => {
    try {
        const student = await StudentCollections.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        req.student = student;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid student ID", error: error.message });
    }
};


// Middleware: POST payload validator
exports.checkPayloadPost = (req, res, next) => {
    const isArr = Array.isArray(req.body?.subjects);
    if (!req.body?.name || !req.body?.age || !req.body?.grade || !req.body?.gender || !isArr) {
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


exports.onHandleGet = async (req, res) => {
    try {
        const data = await StudentCollections.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch students", error: error.message });
    }
}
exports.onHandlePost = async (req, res) => {
    try {
        const data = await StudentCollections.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ message: "Failed to create student", error: error.message });
    }
}
exports.onHandleGetById = async (req, res) => {
    await res.status(200).json(req.student);
}
exports.onHandleUpdate = async (req, res) => {
    try {
        const result = await StudentCollections.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: "Failed to update student", error: error.message });
    }
}
exports.onHandlePatch = async (req, res) => {
    try {
        const result = await StudentCollections.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: "Failed to update student", error: error.message });
    }
}
exports.onHandleDelete = async (req, res) => {
    try {
        await StudentCollections.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Failed to delete student", error: error.message });
    }
}