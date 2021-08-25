const express = require('express');
const { livenessProbe, startupProbe, readynessProbe } = require('../controllers/health.controller');

const router = express.Router();

router.get('/liveness', livenessProbe);
router.get('/startup', startupProbe);
router.get('/readyness', readynessProbe);

module.exports = router;
