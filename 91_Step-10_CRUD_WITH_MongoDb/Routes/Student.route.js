const express = require("express");
const {
    checkParamsId,
    checkPayloadPost,
    onHandleDelete,
    onHandleGet,
    onHandleGetById,
    onHandlePatch,
    onHandlePost,
    onHandleUpdate,
} = require("./../Controller/Student.controller");

const router = express.Router();

router.param("id", checkParamsId);

// // GET all students
// router.get("/", onHandleGet);

// // POST create a new student
// router.post("/", onHandlePost);

// // GET a student by ID
// router.get("/:id", onHandleGetById);

// // PUT update a student (replace)
// router.put("/:id", onHandleUpdate);

// // PATCH update a student (partial)
// router.patch("/:id", onHandlePatch);

// // DELETE a student
// router.delete("/:id", onHandleDelete);

router.route("/").get(onHandleGet).post(checkPayloadPost, onHandlePost);
router
    .route("/:id")
    .get(onHandleGetById)
    .put(onHandleUpdate)
    .patch(onHandlePatch)
    .delete(onHandleDelete);

module.exports = router;
