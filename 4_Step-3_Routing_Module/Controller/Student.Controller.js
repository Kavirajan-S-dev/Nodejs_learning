const fs = require("fs");

const collections = JSON.parse(fs.readFileSync("./student.json", "utf-8"));

exports.onHandleGet = (req, res) => {
    return res.json(collections);
};
exports.onHandleGetById = (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    }
    return res.json(exists);
};
exports.onHandlePost = async (req, res) => {
    console.log(req.body); //TO GET PAYLOAD NEED TO ADD express.json() as middleware.
    const exists = collections.find((item) => item.id === req.body.id);
    if (exists) {
        return res.status(409).json({ status: "Conflict", error: "Already user with id exists" })
    }
    collections.push(req.body);
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
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    };
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
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    };
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
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    };
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