const router = require("express").Router();
const apiRoutes = require("./api");
const authRoute = require("./auth");

// API Routes
router.use("/auth", authRoute);
router.use("/api", apiRoutes);

module.exports = router;
