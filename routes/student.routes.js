const router = require("express").Router();
const studentController = require("../controllers/students.controller");

//GET requests
router.get("/all", studentController.getAllStudents);
router.get("/student/:id", studentController.getStudent);
//POST requests
router.post("/login", studentController.studentLogin);
router.post("/new", studentController.registerNewStudent);

router.patch("/update/:id/:admin", studentController.updateStudent);
router.patch("/grades", studentController.updateGrades);
router.patch("/graduates", studentController.graduateStudents);

module.exports = router;