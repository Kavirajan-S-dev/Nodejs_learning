const express = require("express");
const morgan = require("morgan");

// const { student } = require("./Schema/Student.Schema");

require("./db.config");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));

// const testStudent = new student({
//     name: "Kavirajan S",
//     age: 24,
//     grade: 'A',
//     gender: 'Male',
//     subjects: ["English"]
// })

// testStudent.save().then((doc) => {
//     console.log(doc);
// }).catch((err) => {
//     console.log(err);
// });

const router = require("./Routes/Student.route");

app.use("/api/api/student", router);

module.exports = app;
