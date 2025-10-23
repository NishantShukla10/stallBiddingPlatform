const express = require("express");
const router = express.Router();

const {placeBid, getBidsByStall, getBidsByUser} = require("../controllers/bidController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


router.post("/", protect, authorizeRoles("student"), placeBid);
router.get("/stall/:stallId", getBidsByStall);
router.get("/user", protect, getBidsByUser);

module.exports = router;