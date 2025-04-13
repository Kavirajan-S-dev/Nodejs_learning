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


app.get("/api/v1/student", (req, res) => {
    return res.json(collections);
});

app.get("/api/v1/student/:id", (req, res) => {
    const { id } = req.params;
    const exists = collections.find((item) => item.id === id * 1);
    if (!exists) {
        return res.status(404).json({ status: "Not Found", error: "User not found" })
    }
    return res.json(exists);
});

// {
//     "id": 1,
//     "name": "Kavirajan S",
//     "age": 20,
//     "major": "Computer Science"
// }
app.post("/api/v1/student", async (req, res) => {
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
});

// {
//     "name": "Kavirajan S",
//     "age": 20
// }
app.put("/api/v1/student/:id", async (req, res) => {
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
});


// {
//     "major": 20
// }
app.patch("/api/v1/student/:id", async (req, res) => {
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
});

app.delete("/api/v1/student/:id", async (req, res) => {
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
});

// Start server
app.listen(PORT, HOST, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`✅ Server started in ${NODE_ENV} mode: http://${HOST}:${PORT}`);
    }
});