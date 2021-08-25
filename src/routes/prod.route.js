const express = require('express');
const {
  postRegister, postValidateCode, postSubmit,
} = require('../controllers/prod.controller');

const router = express.Router();

// Routes for activity
router.post('/register', postRegister);
router.post('/validate', postValidateCode);
router.post('/submit', postSubmit);

module.exports = router;
