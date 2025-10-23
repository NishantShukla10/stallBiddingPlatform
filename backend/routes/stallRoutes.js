const express = require("express");
const router = express.Router();

const {
    createStall,
    getAllStalls,
    getStallById,
    updateStall,
    deleteStall,
    markStallAsSold,
} = require("../controllers/stallController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


// Public routes
router.get("/", getAllStalls);                
router.get("/:id", getStallById);            

router.post("/", protect, authorizeRoles("principal"), createStall);

router.put("/:id", protect, authorizeRoles("principal"), updateStall);

router.delete("/:id", protect, authorizeRoles("principal"), deleteStall);

router.patch("/:id/sold", protect, authorizeRoles("principal"), markStallAsSold);

module.exports = router;