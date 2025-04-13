const mongoose = require("./../db.config");
const { StudentSchema } = require("./../Schema/Student.Schema");

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;