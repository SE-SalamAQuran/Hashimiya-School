const router = require("express").Router();
const alertControllers = require("../controllers/alerts.controller");

//GET requests
router.get("/all", alertControllers.fetchAlerts);
router.get("/student/:id", alertControllers.getStudentAlerts);
router.get("/:grade/:section", alertControllers.getGradeAlerts);

//POST requests
router.post("/new", alertControllers.newAlert);

//DELETE requests
router.delete("/alert/:id/:admin", alertControllers.deleteAlert);
module.exports = router;