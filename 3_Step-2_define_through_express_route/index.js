const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env; // To access .env Install dotenv

const collections = fs.readFileSync("./student.json", "utf-8")

app.use(express.json());
app.use(morgan("dev"));

const onHandleGet = (req, res) => {
    return res.json(collections);
};
const onHandleGetById = (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    }
    return res.json(exists);
};
const onHandlePost = async (req, res) => {
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
const onHandleUpdate = async (req, res) => {
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
const onHandlePatch = async (req, res) => {
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
const onHandleDelete = async (req, res) => {
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

    });
};

app.route("/api/v1/student").get(onHandleGet).post(onHandlePost);

app.route("/api/v1/student/:id").get(onHandleGetById).put(onHandleUpdate).patch(onHandlePatch).delete(onHandleDelete);

// Start server
app.listen(PORT, HOST, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`✅ Server started in ${NODE_ENV} mode: http://${HOST}:${PORT}`);
    }
});