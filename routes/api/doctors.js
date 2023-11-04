const express = require('express');

const router = express.Router();
const ctrl = require('../../controllers/doctors');

router.get('/problem/:problemId', ctrl.getDoctorsByProblem);

module.exports = router;
