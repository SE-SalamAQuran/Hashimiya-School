const router = require("express").Router();
const teachersController = require("../controllers/teachers.controller");

//GET requests
router.get("/all", teachersController.getAllTeachers);
router.get("/teacher/:id", teachersController.getTeacher);
router.get("/periods/:id", teachersController.getPeriods);

//POST requests
router.post("/login", teachersController.teacherLogin);
router.post("/register", teachersController.registerNewTeacher);

module.exports = router;