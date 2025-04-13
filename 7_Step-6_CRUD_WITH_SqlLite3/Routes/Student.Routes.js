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
