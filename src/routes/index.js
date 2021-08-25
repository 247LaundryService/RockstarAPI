const express = require('express');
const rseProdRoute = require('./prod.route');
const rseDevRoute = require('./dev.route');
const healthRoute = require('./health.route');

const router = express.Router();

// Top level routes
router.use('/', rseProdRoute);
router.use('/dev', rseDevRoute);
router.use('/health', healthRoute);

module.exports = router;
