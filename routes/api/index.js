const router = require("express").Router();
const bookRoutes = require("./book");
const commentRoutes = require("./comment");
const listRoutes = require("./list");
const tagRoutes = require("./tag");

// Book routes
router.use("/book", bookRoutes);
router.use("/comment", commentRoutes);
router.use("/list", listRoutes);
router.use("/tag", tagRoutes);

module.exports = router;
