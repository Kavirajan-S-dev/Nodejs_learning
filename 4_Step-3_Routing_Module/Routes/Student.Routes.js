const express = require("express");
const router = express.Router();

const {
    onHandleGet,
    onHandleGetById,
    onHandleDelete,
    onHandlePatch,
    onHandlePost,
    onHandleUpdate,
} = require("../Controller/Student.Controller");

// Route for "/"
router.route("/")
    .get(onHandleGet)
    .post(onHandlePost);

// Route for "/:id"
router.route("/:id")
    .get(onHandleGetById)     // Get a student by ID
    .put(onHandleUpdate)      // Full update of a student
    .patch(onHandlePatch)     // Partial update of a student
    .delete(onHandleDelete);  // Delete a student

// router.get("/", onHandleGet);
// router.post("/", onHandlePost);
// router.get("/:id", onHandleGetById);
// router.put("/:id", onHandleUpdate);
// router.patch("/:id", onHandlePatch);
// router.delete("/:id", onHandleDelete);

module.exports = router;
