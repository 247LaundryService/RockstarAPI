const express = require('express');
const {
  postRegister, postValidateCode, postSubmit, postReset,
} = require('../controllers/dev.controller');

const router = express.Router();

// Routes for activity
router.post('/register', postRegister);
router.post('/validate', postValidateCode);
router.post('/submit', postSubmit);
router.post('/reset', postReset);

module.exports = router;
