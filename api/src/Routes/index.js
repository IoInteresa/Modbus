const { Router } = require("express");

const { getMachinesStats } = require("../Controllers");

const router = Router();

router.post("/machinesStats", getMachinesStats);

module.exports = router;
