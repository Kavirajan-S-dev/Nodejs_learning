/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: A list of students
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - major
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *               major:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 *
 * /student/{id}:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A student object
 *       404:
 *         description: Student not found
 *   put:
 *     summary: Fully update a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *   patch:
 *     summary: Partially update a student's major
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - major
 *             properties:
 *               major:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student major updated
 *   delete:
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Student deleted
 */


const express = require("express");
const router = express.Router();

const {
    onHandleGet,
    onHandleGetById,
    onHandleDelete,
    onHandlePatch,
    onHandlePost,
    onHandleUpdate,
    checkParamsId,
    checkPayloadPost,
    checkPayloadPut,
    checkPayloadPatch
} = require("../Controller/Student.Controller");

// Middleware
router.param("id", checkParamsId);

// router.param("id", (req, res, next, id) => {
//     console.log(id);
//     next();
// });

// Route for "/"
router.route("/")
    .get(onHandleGet)
    .post(checkPayloadPost, onHandlePost);

// Route for "/:id"
router.route("/:id")
    .get(onHandleGetById)     // Get a student by ID
    .put(checkPayloadPut, onHandleUpdate)      // Full update of a student
    .patch(checkPayloadPatch, onHandlePatch)     // Partial update of a student
    .delete(onHandleDelete);  // Delete a student

// router.get("/", onHandleGet);
// router.post("/", onHandlePost);
// router.get("/:id", onHandleGetById);
// router.put("/:id", onHandleUpdate);
// router.patch("/:id", onHandlePatch);
// router.delete("/:id", onHandleDelete);

module.exports = router;
