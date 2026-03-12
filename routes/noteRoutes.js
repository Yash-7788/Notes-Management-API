const express = require("express")
const verifyToken = require("../middleware/authMiddleware")
const {
    createNotes,
    getNotes,
    updateNotes,
    deleteNotes
} = require("../controllers/notesController")

const router = express.Router()

router.post("/", verifyToken, createNotes)
router.get("/", verifyToken, getNotes)
router.put("/:id", verifyToken, updateNotes)
router.delete("/:id", verifyToken, deleteNotes)

module.exports = router;