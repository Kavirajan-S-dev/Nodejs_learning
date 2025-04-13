const fs = require("fs");

const collections = JSON.parse(fs.readFileSync("./student.json", "utf-8"));

// Used to handle check user exists
exports.checkParamsId = (req, res, next, id) => {
    const exists = collections.find((item) => item.id === id * 1);
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    }
    next();
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


exports.onHandleGet = (req, res) => {
    return res.json(collections);
};
exports.onHandleGetById = (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    return res.json(exists);
};
exports.onHandlePost = async (req, res) => {
    console.log(req.body); //TO GET PAYLOAD NEED TO ADD express.json() as middleware.
    const id = collections.length + 1;
    const newObj = Object.assign(req.body, { id: id });
    collections.push(newObj);

    await fs.writeFile("./student.json", JSON.stringify(collections), (err) => {
        if (err) {
            return res.status(400).json({ status: "Bad Request", error: err });
        } else {
            return res.status(201).json({
                status: "Success",
                data: collections,
            });
        }
    });
};
exports.onHandleUpdate = async (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    const index = collections.indexOf(exists);
    collections[index] = Object.assign(exists, req.body);
    await fs.writeFile("./student.json", JSON.stringify(collections), async (err) => {
        if (err) {
            return res.status(400).json({ status: "Bad Request", error: err });
        } else {
            return res.status(200).json({
                status: "Updated",
                data: collections,
            });
        };
    });
};
exports.onHandlePatch = async (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    const index = collections.indexOf(exists);
    collections[index] = Object.assign(exists, req.body);
    await fs.writeFile("./student.json", JSON.stringify(collections), (err) => {
        if (err) {
            return res.status(400).json({ status: "Bad Request", error: err });
        } else {
            return res.status(200).json({
                status: "Updated",
                data: collections,
            });
        };
    });
};
exports.onHandleDelete = async (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    const index = collections.indexOf(exists);
    collections.splice(index);
    await fs.writeFile("./student.json", JSON.stringify(collections), (err) => {
        if (err) {
            return res.status(400).json({ status: "Bad Request", error: err });
        } else {
            return res.status(204).json({
                status: "No Content",
                data: null,
            });
        };

    })
};