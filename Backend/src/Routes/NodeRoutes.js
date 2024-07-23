const express = require('express');
const { getData, createData, updateData, deleteData } = require('../controller/NotesController');
const router = express.Router();

router.get("/getNote", getData);
router.post("/addNote", createData);
router.post("/updateNote", updateData);
router.post("/deleteNote", deleteData);

module.exports = router;