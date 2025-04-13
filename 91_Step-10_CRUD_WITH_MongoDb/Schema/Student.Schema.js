const mongoose = require("./../db.config");


// const mongooseFieldRules = {
//     type: {
//         description: "Data type of the field",
//         examples: ["String", "Number", "Date", "[String]"]
//     },
//     required: {
//         description: "Specifies whether the field is mandatory",
//         examples: [true, false]
//     },
//     default: {
//         description: "Value to assign if none is provided",
//         examples: ["Date.now", "true", "[]", '"N/A"']
//     },
//     enum: {
//         description: "Restricts the value to a specific set (only for `String`, `Number`)",
//         examples: ["['Male', 'Female', 'Other']"]
//     },
//     min: {
//         description: "Minimum value for `Number` or `Date` fields",
//         examples: ["min: 16"]
//     },
//     max: {
//         description: "Maximum value for `Number` or `Date` fields",
//         examples: ["max: 100"]
//     },
//     trim: {
//         description: "Removes whitespace from both ends (only for `String`)",
//         examples: ["trim: true"]
//     },
//     match: {
//         description: "Regular expression pattern the value must match (only for `String`)",
//         examples: ["match: /^[A-Za-z]+$/"]
//     },
//     validate: {
//         description: "Custom validation function",
//         examples: ["validate: val => val.length > 3"]
//     },
//     unique: {
//         description: "Ensures no duplicate values across documents (not a validator)",
//         examples: ["unique: true"]
//     },
//     lowercase: {
//         description: "Converts `String` to lowercase before saving",
//         examples: ["lowercase: true"]
//     },
//     uppercase: {
//         description: "Converts `String` to uppercase before saving",
//         examples: ["uppercase: true"]
//     },
//     immutable: {
//         description: "Prevents the field from being changed after it's set",
//         examples: ["immutable: true"]
//     },
//     select: {
//         description: "Include/exclude the field in query results by default",
//         examples: ["select: false"]
//     }
// };


// const StudentSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     grade: String,
//     gender: String,
//     subjects: [String],
//     isEnrolled: Boolean,
//     admissionDate: Date
// });

exports.StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    age: {
        type: Number,
        min: 5,
        max: 100,
        required: false
    },
    grade: {
        type: String,
        enum: ['0', '0+', 'A', 'B', 'C', 'D'],
        required: [true, "Age is required"],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, "Gender is required"],
    },
    subjects: {
        type: [String],
        default: [],
        required: false
    },
    isEnrolled: {
        type: Boolean,
        default: true,
        required: false
    },
    admissionDate: {
        type: Date,
        default: Date.now,
        required: false
    }
});

// exports.student = mongoose.model("Students", StudentSchema);
