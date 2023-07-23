// create web server
const express = require("express");
const router = express.Router();

// create commentsController
const commentsController = require("../controllers/comments_controller");

// create router for create comment
router.post("/create", commentsController.create);

// create router for delete comment
router.get("/destroy/:id", commentsController.destroy);

// export router
module.exports = router;