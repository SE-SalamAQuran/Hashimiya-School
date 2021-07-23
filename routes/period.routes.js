const router = require("express").Router();
const periodsController = require("../controllers/periods.controller");

//GET requests
router.get("/all", periodsController.getAllPeriods);
router.get("/period/:id", periodsController.getPeriod);

//POST requests
router.post("/add", periodsController.newPeriod);

//PATCH requests
router.patch("/update/:id/:admin", periodsController.updatePeriod);

//DELETE requests
router.delete("/period/:id/:admin", periodsController.removePeriod);
module.exports = router;